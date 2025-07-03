// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {DeployJackMint} from "../../script/DeployJackMint.s.sol";
import {JackMint} from "../../src/JackMint.sol";
import {HelperConfig} from "../../script/HelperConfig.s.sol";
import {Test, console2} from "forge-std/Test.sol";
import {Vm} from "forge-std/Vm.sol";
import {VRFCoordinatorV2_5Mock} from "@chainlink/contracts/src/v0.8/vrf/mocks/VRFCoordinatorV2_5Mock.sol";
import {LinkToken} from "../../test/mocks/LinkToken.sol";
import {CodeConstants} from "../../script/HelperConfig.s.sol";

contract JackMintTest is Test, CodeConstants {
    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/
    event RequestedJackMintWinner(uint256 indexed requestId);
    event JackMintEnter(address indexed player);
    event WinnerPicked(address indexed player);

    JackMint public jackMint;
    HelperConfig public helperConfig;

    uint256 subscriptionId;
    bytes32 gasLane;
    uint256 automationUpdateInterval;
    uint256 jackMintEntranceFee;
    uint32 callbackGasLimit;
    address vrfCoordinatorV2_5;
    LinkToken link;

    address public PLAYER = makeAddr("player");
    uint256 public constant STARTING_USER_BALANCE = 10 ether;
    uint256 public constant LINK_BALANCE = 100 ether;

    function setUp() external {
        DeployJackMint deployer = new DeployJackMint();
        (jackMint, helperConfig) = deployer.run();
        vm.deal(PLAYER, STARTING_USER_BALANCE);

        HelperConfig.NetworkConfig memory config = helperConfig.getConfig();
        subscriptionId = config.subscriptionId;
        gasLane = config.gasLane;
        automationUpdateInterval = config.automationUpdateInterval;
        jackMintEntranceFee = config.jackMintEntranceFee;
        callbackGasLimit = config.callbackGasLimit;
        vrfCoordinatorV2_5 = config.vrfCoordinatorV2_5;
        link = LinkToken(config.link);

        vm.startPrank(msg.sender);//Extra
        if (block.chainid == LOCAL_CHAIN_ID) {
            link.mint(msg.sender, LINK_BALANCE);
            VRFCoordinatorV2_5Mock(vrfCoordinatorV2_5).fundSubscription(subscriptionId, LINK_BALANCE);
        }
        link.approve(vrfCoordinatorV2_5, LINK_BALANCE);
        vm.stopPrank();
    }

    function testJackMintInitializesInOpenState() public view {
        assert(jackMint.getJackMintState() == JackMint.JackMintState.OPEN);
    }

    /*//////////////////////////////////////////////////////////////
                              ENTER RAFFLE
    //////////////////////////////////////////////////////////////*/
    function testJackMintRevertsWHenYouDontPayEnough() public {
        // Arrange
        vm.prank(PLAYER);
        // Act / Assert
        vm.expectRevert(JackMint.JackMint__SendMoreToEnterJackMint.selector);
        jackMint.enterJackMint();
    }

    function testJackMintRecordsPlayerWhenTheyEnter() public {
        // Arrange
        vm.prank(PLAYER);
        // Act
        jackMint.enterJackMint{value: jackMintEntranceFee}();
        // Assert
        address playerRecorded = jackMint.getPlayer(0);
        assert(playerRecorded == PLAYER);
    }

    function testEmitsEventOnEntrance() public {
        // Arrange
        vm.prank(PLAYER);

        // Act / Assert
        vm.expectEmit(true, false, false, false, address(jackMint));
        emit JackMintEnter(PLAYER);
        jackMint.enterJackMint{value: jackMintEntranceFee}();
    }

    function testDontAllowPlayersToEnterWhileJackMintIsCalculating() public {
        // Arrange
        vm.prank(PLAYER);
        jackMint.enterJackMint{value: jackMintEntranceFee}();
        vm.warp(block.timestamp + automationUpdateInterval + 1);
        vm.roll(block.number + 1);
        jackMint.performUpkeep("");

        // Act / Assert
        vm.expectRevert(JackMint.JackMint__JackMintNotOpen.selector);
        vm.prank(PLAYER);
        jackMint.enterJackMint{value: jackMintEntranceFee}();
    }

    /*//////////////////////////////////////////////////////////////
                              CHECKUPKEEP
    //////////////////////////////////////////////////////////////*/
    function testCheckUpkeepReturnsFalseIfItHasNoBalance() public {
        // Arrange
        vm.warp(block.timestamp + automationUpdateInterval + 1);
        vm.roll(block.number + 1);

        // Act
        (bool upkeepNeeded,) = jackMint.checkUpkeep("");

        // Assert
        assert(!upkeepNeeded);
    }

    function testCheckUpkeepReturnsFalseIfJackMintIsntOpen() public {
        // Arrange
        vm.prank(PLAYER);
        jackMint.enterJackMint{value: jackMintEntranceFee}();
        vm.warp(block.timestamp + automationUpdateInterval + 1);
        vm.roll(block.number + 1);
        jackMint.performUpkeep("");
        JackMint.JackMintState jackMintState = jackMint.getJackMintState();
        // Act
        (bool upkeepNeeded,) = jackMint.checkUpkeep("");
        // Assert
        assert(jackMintState == JackMint.JackMintState.CALCULATING);
        assert(upkeepNeeded == false);
    }

    // Challenge 1. testCheckUpkeepReturnsFalseIfEnoughTimeHasntPassed
    function testCheckUpkeepReturnsFalseIfEnoughTimeHasntPassed() public {
        // Arrange
        vm.prank(PLAYER);
        jackMint.enterJackMint{value: jackMintEntranceFee}();

        // Act
        (bool upkeepNeeded,) = jackMint.checkUpkeep("");

        // Assert
        assert(!upkeepNeeded);
    }

    // Challenge 2. testCheckUpkeepReturnsTrueWhenParametersGood
    function testCheckUpkeepReturnsTrueWhenParametersGood() public {
        // Arrange
        vm.prank(PLAYER);
        jackMint.enterJackMint{value: jackMintEntranceFee}();
        vm.warp(block.timestamp + automationUpdateInterval + 1);
        vm.roll(block.number + 1);

        // Act
        (bool upkeepNeeded,) = jackMint.checkUpkeep("");

        // Assert
        assert(upkeepNeeded);
    }

    /*//////////////////////////////////////////////////////////////
                             PERFORMUPKEEP
    //////////////////////////////////////////////////////////////*/
    function testPerformUpkeepCanOnlyRunIfCheckUpkeepIsTrue() public {
        // Arrange
        vm.prank(PLAYER);
        jackMint.enterJackMint{value: jackMintEntranceFee}();
        vm.warp(block.timestamp + automationUpdateInterval + 1);
        vm.roll(block.number + 1);

        // Act / Assert
        // It doesnt revert
        jackMint.performUpkeep("");
    }

    function testPerformUpkeepRevertsIfCheckUpkeepIsFalse() public {
        // Arrange
        uint256 currentBalance = 0;
        uint256 numPlayers = 0;
        JackMint.JackMintState rState = jackMint.getJackMintState();
        // Act / Assert
        vm.expectRevert(
            abi.encodeWithSelector(JackMint.JackMint__UpkeepNotNeeded.selector, currentBalance, numPlayers, rState)
        );
        jackMint.performUpkeep("");
    }

    function testPerformUpkeepUpdatesJackMintStateAndEmitsRequestId() public {
        // Arrange
        vm.prank(PLAYER);
        jackMint.enterJackMint{value: jackMintEntranceFee}();
        vm.warp(block.timestamp + automationUpdateInterval + 1);
        vm.roll(block.number + 1);

        // Act
        vm.recordLogs();
        jackMint.performUpkeep(""); // emits requestId
        Vm.Log[] memory entries = vm.getRecordedLogs();
        bytes32 requestId = entries[1].topics[1];

        // Assert
        JackMint.JackMintState jackMintState = jackMint.getJackMintState();
        // requestId = jackMint.getLastRequestId();
        assert(uint256(requestId) > 0);
        assert(uint256(jackMintState) == 1); // 0 = open, 1 = calculating
    }

    /*//////////////////////////////////////////////////////////////
                           FULFILLRANDOMWORDS
    //////////////////////////////////////////////////////////////*/
    modifier jackMintEntered() {
        vm.prank(PLAYER);
        jackMint.enterJackMint{value: jackMintEntranceFee}();
        vm.warp(block.timestamp + automationUpdateInterval + 1);
        vm.roll(block.number + 1);
        _;
    }

    modifier skipFork() {
        if (block.chainid != 31337) {
            return;
        }
        _;
    }

    function testFulfillRandomWordsCanOnlyBeCalledAfterPerformUpkeep() public jackMintEntered skipFork {
        // Arrange
        // Act / Assert
        vm.expectRevert(VRFCoordinatorV2_5Mock.InvalidRequest.selector);
        // vm.mockCall could be used here...
        VRFCoordinatorV2_5Mock(vrfCoordinatorV2_5).fulfillRandomWords(0, address(jackMint));

        vm.expectRevert(VRFCoordinatorV2_5Mock.InvalidRequest.selector);
        VRFCoordinatorV2_5Mock(vrfCoordinatorV2_5).fulfillRandomWords(1, address(jackMint));
    }

    function testFulfillRandomWordsPicksAWinnerResetsAndSendsMoney() public jackMintEntered skipFork {
        address expectedWinner = address(1);

        // Arrange
        uint256 additionalEntrances = 3;
        uint256 startingIndex = 1; // We have starting index be 1 so we can start with address(1) and not address(0)

        for (uint256 i = startingIndex; i < startingIndex + additionalEntrances; i++) {
            address player = address(uint160(i));
            hoax(player, 1 ether); // deal 1 eth to the player
            jackMint.enterJackMint{value: jackMintEntranceFee}();
        }

        uint256 startingTimeStamp = jackMint.getLastTimeStamp();
        uint256 startingBalance = expectedWinner.balance;

        // Act
        vm.recordLogs();
        jackMint.performUpkeep(""); // emits requestId
        Vm.Log[] memory entries = vm.getRecordedLogs();
        console2.logBytes32(entries[1].topics[1]);
        bytes32 requestId = entries[1].topics[1]; // get the requestId from the logs

        VRFCoordinatorV2_5Mock(vrfCoordinatorV2_5).fulfillRandomWords(uint256(requestId), address(jackMint));

        // Assert
        address recentWinner = jackMint.getRecentWinner();
        JackMint.JackMintState jackMintState = jackMint.getJackMintState();
        uint256 winnerBalance = recentWinner.balance;
        uint256 endingTimeStamp = jackMint.getLastTimeStamp();
        uint256 prize = jackMintEntranceFee * (additionalEntrances + 1);

        assert(recentWinner == expectedWinner);
        assert(uint256(jackMintState) == 0);
        assert(winnerBalance == startingBalance + prize);
        assert(endingTimeStamp > startingTimeStamp);
    }
}
