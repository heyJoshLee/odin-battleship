const BattleshipGame = () => {
  const players = [];
  let currentPlayerIndex = 0;

  const getPlayers = () => players;

  const getComputerPlayer = () => players.find((player) => !player.isHuman());

  const getHumanPlayer = () => players.find((player) => player.isHuman());

  const getPlayerIndex = (playerObject) => players.indexOf(playerObject);

  const getPlayerByIndex = (index) => players[index];

  const getCurrentPlayer = () => getPlayerByIndex(currentPlayerIndex);

  const getCurrentPlayerIndex = () => currentPlayerIndex;

  const setCurrentPlayerIndex = (newIndex) => currentPlayerIndex = newIndex;

  const addPlayer = (playerToAdd) => players.push(playerToAdd);

  const chooseRandomPlayerIndex = () => Math.floor(Math.random() * (players.length));
  const createElement = (tag, options = {}) => {
    const element = document.createElement(tag);
    if (options.className) {
      if (Array.isArray(options.className)) {
        options.className.forEach((classNameToAdd) => {
          element.classList.add(classNameToAdd);
        });
      } else {
        element.classList.add(options.className);
      }
    }

    if (options.x) { element.dataset.x = options.x; }
    if (options.y) { element.dataset.y = options.y; }
    if (options.content) { element.textContent = options.content; }
    if (options.boardOwnerPlayerIndex) { element.dataset.boardOwnerPlayerIndex = options.boardOwnerPlayerIndex; }

    return element;
  };

  const nextPlayerIndex = () => {
    let nextIndex = currentPlayerIndex + 1;
    if (nextIndex >= players.length) { nextIndex = 0; }
    return nextIndex;
  };

  const generatePlayerBoards = (gameBoardFactory, boardSize) => {
    players.forEach((player) => {
      const newBoard = gameBoardFactory();
      newBoard.setUpBoard(boardSize);
      newBoard.setPlayerIndex(getPlayerIndex(player));
      player.setGameboard(newBoard);
    });
  };

  const printPlayerBoards = () => {
    const pageContainer = document.querySelector('#page-container');
    const playerBoardsContainer = document.createElement('div');
    playerBoardsContainer.id = 'player-boards-container';
    pageContainer.appendChild(playerBoardsContainer);

    printInitialBoardForPlayer(players[0], 0, playerBoardsContainer);
    printInitialBoardForPlayer(players[1], 1, playerBoardsContainer);
  };

  const printInitialBoardForPlayer = (player, playerIndex, playerBoardsContainer) => {
    const playerAreaContainer = createElement('div', { className: 'player-area-container' });
    playerBoardsContainer.appendChild(playerAreaContainer);

    const playerNameContainer = createElement('div', {
      className: 'player-name-container',
      content: player.getPlayerName(),
    });

    playerAreaContainer.append(playerNameContainer);

    player.getGameboard().getGameboardArray().forEach((row, rowIndex) => {
      const newRow = createElement('div', {
        className: 'row',
      });
      playerBoardsContainer.appendChild(newRow);

      row.forEach((column, columnIndex) => {
        const newSpace = createElement('div', {
          className: ['space', 'empty'],
          x: rowIndex.toString(),
          y: columnIndex.toString(),
          boardOwnerPlayerIndex: playerIndex.toString(),
        });

        newRow.appendChild(newSpace);

        newSpace.addEventListener('click', () => {
          if (playerIndex === currentPlayerIndex) { return; }
          if (isGameOver()) { return; }
          if (!newSpace.classList.contains('empty')) return;
          if (currentPlayerCanMakeAMove()) {
            const boardToAttack = getPlayerByIndex(playerIndex).getGameboard();
            playerTakesTurn(boardToAttack, rowIndex, columnIndex);
            if (isGameOver()) {
              console.log(`${getCurrentPlayer()} wins!`);
            } else {
              getComputerPlayer().attackRandomSpace(getCurrentPlayer().getGameboard());
              if (isGameOver()) {
                console.log(`${getCurrentPlayer()} wins!`);
              }
            }
          }
        });
      });
    });
  };

  const isGameOver = () => players.some((player) => player.getGameboard().isAllShipsSunk());

  const playerTakesTurn = (boardToAttack, x, y) => {
    const hasAttackedSuccessfully = chooseSpaceToAttack(
      boardToAttack,
      x,
      y,
    );
  };

  const currentPlayerCanMakeAMove = () => true;

  const chooseSpaceToAttack = (boardToAttack, x, y) => {
    const hasAttackedSuccessfully = getCurrentPlayer().attackSpace(boardToAttack, x, y);
    return hasAttackedSuccessfully;
  };

  const generateTestMatch = (playerFactory, gameboardFactory, shipFactory) => {
    const battleshipGame = BattleshipGame();

    const player1 = playerFactory();
    const player2 = playerFactory(true);

    battleshipGame.addPlayer(player1);
    battleshipGame.addPlayer(player2);
    battleshipGame.generatePlayerBoards(gameboardFactory, 5);
    battleshipGame.printPlayerBoards();

    const player1Ship1 = shipFactory(3, true);
    const player1Ship2 = shipFactory(2, false);

    const player2Ship1 = shipFactory(3, false);
    const player2Ship2 = shipFactory(2, true);
    battleshipGame.getPlayerByIndex(0).getGameboard().placeShip(0, 0, player1Ship1);
    battleshipGame.getPlayerByIndex(0).getGameboard().placeShip(3, 1, player1Ship2);

    battleshipGame.getPlayerByIndex(1).getGameboard().placeShip(4, 0, player2Ship1);
    battleshipGame.getPlayerByIndex(1).getGameboard().placeShip(1, 1, player2Ship2);
  };

  return {
    getPlayers,
    addPlayer,
    nextPlayerIndex,
    chooseRandomPlayerIndex,
    getCurrentPlayerIndex,
    setCurrentPlayerIndex,
    generatePlayerBoards,
    printPlayerBoards,
    generateTestMatch,
    getPlayerByIndex,
  };
};

export default BattleshipGame;
