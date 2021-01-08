// SPDX-License-Identifier: MIT
// truffle run verify Token_erc20 --network rinkeby

pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract ERC20_Covid19_Token is ERC20 {

    /**
     * @dev Constructor that gives _msgSender() all of existing tokens.
     */
    constructor () public ERC20("Covid19Token", "C19") {
        _mint(msg.sender, 10000 * (10 ** 18));
    }
}
