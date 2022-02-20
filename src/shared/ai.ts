import {State} from "./state";
import {Game} from "./game";

export type LevelOfIntelligence = 1 | 2 | 3;

export class AI {

    public levelOfIntelligence!: LevelOfIntelligence;
    public game: Game;

    constructor(
        public level: LevelOfIntelligence,
    ) {
        this.levelOfIntelligence = level;
    }

    public minimaxValue(state: State) {
        const thisClass = this;
        if(state.isTerminal()) {
            //a terminal game state is the base case
            return this.game.score(state);
        }
        else {
            let stateScore: number; // this stores the minimax value we'll compute

            if(state.turn === "X")
                // X maximizs --> initialize to a value smaller than any possible score
                stateScore = -1000;
            else
                // O minimizes --> initialize to a value larger than any possible score
                stateScore = 1000;

            const availablePositions = state.emptyCells();

            //enumerate next available states using the info form available positions
            const availableNextStates = availablePositions.map(function(pos) {
                const action = new AIAction(pos);

                const nextState = action.applyTo(state);

                return nextState;
            });

            /* calculate the minimax value for all available next states
             * and evaluate the current state's value */
            availableNextStates.forEach(function(nextState) {

                const nextScore = thisClass.minimaxValue(nextState); //recursive call

                if(state.turn === "X") {
                    // X wants to maximize --> update stateScore iff nextScore is larger
                    if(nextScore > stateScore)
                        stateScore = nextScore;
                }
                else {
                    // O wants to minimize --> update stateScore iff nextScore is smaller
                    if(nextScore < stateScore)
                        stateScore = nextScore;
                }
            });

            //backup the minimax value
            return stateScore;
        }
    }

    public takeABlindMove(turn: string) {
        const available = this.game.currentState.emptyCells();
        const randomCell = available[Math.floor(Math.random() * available.length)];
        const action = new AIAction(randomCell);

        const next = action.applyTo(this.game.currentState);

        this.game.gameModule.board[randomCell] = turn === 'O' ? '○' : '×';

        this.game.advanceTo(next);

    }

    public takeANoviceMove(turn: string) {
        const thisClass = this;
        const available = this.game.currentState.emptyCells();

        //enumerate and calculate the score for each available actions to the ai player
        const availableActions = available.map(function(pos) {
            const action =  new AIAction(pos); //create the action object

            //get next state by applying the action
            const nextState = action.applyTo(thisClass.game.currentState);

            //calculate and set the action's minimax value
            action.minimaxVal = thisClass.minimaxValue(nextState);

            return action;
        });

        //sort the enumerated actions list by score
        if(turn === "X")
            //X maximizes --> decend sort the actions to have the maximum minimax at first
            availableActions.sort(AIAction.DESCENDING);
        else
            //O minimizes --> ascend sort the actions to have the minimum minimax at first
            availableActions.sort(AIAction.ASCENDING);


        /*
         * take the optimal action 40% of the time
         * take the 1st suboptimal action 60% of the time
         */
        let chosenAction;
        if(Math.random()*100 <= 40) {
            chosenAction = availableActions[0];
        }
        else {
            if(availableActions.length >= 2) {
                //if there is two or more available actions, choose the 1st suboptimal
                chosenAction = availableActions[1];
            }
            else {
                //choose the only available actions
                chosenAction = availableActions[0];
            }
        }
        const next = chosenAction.applyTo(this.game.currentState);

        this.game.gameModule.board[chosenAction.movePosition] = turn === 'O' ? '○' : '×';

        this.game.advanceTo(next);

    }

    public takeAMasterMove(turn: string) {
        const thisClass = this;
        const available = this.game.currentState.emptyCells();

        //enumerate and calculate the score for each avaialable actions to the ai player
        const availableActions = available.map(function(pos) {
            const action =  new AIAction(pos); //create the action object

            //get next state by applying the action
            const next = action.applyTo(thisClass.game.currentState);

            //calculate and set the action's minmax value
            action.minimaxVal = thisClass.minimaxValue(next);

            return action;
        });

        //sort the enumerated actions list by score
        if(turn === "X")
            //X maximizes --> descend sort the actions to have the largest minimax at first
            availableActions.sort(AIAction.DESCENDING);
        else
            //O minimizes --> acend sort the actions to have the smallest minimax at first
            availableActions.sort(AIAction.ASCENDING);


        //take the first action as it's the optimal
        const chosenAction = availableActions[0];
        const next = chosenAction.applyTo(this.game.currentState);

        // this just adds an X or an O at the chosen position on the board in the UI
        this.game.gameModule.board[chosenAction.movePosition] = turn === 'O' ? '○' : '×';

        // take the game to the next state
        this.game.advanceTo(next);
    }

    public plays(_game: Game){
        this.game = _game;
    };

    public notify (turn: string) {
        switch(this.levelOfIntelligence) {
            //invoke the desired behavior based on the level chosen
            case 1: this.takeABlindMove(turn); break;
            case 2: this.takeANoviceMove(turn); break;
            case 3: this.takeAMasterMove(turn); break;
        }
    };

}

export class AIAction {

    public movePosition;

    public minimaxVal = 0;
    static ASCENDING: (firstAction: any, secondAction: any) => (number);
    static DESCENDING: (firstAction: any, secondAction: any) => (number);

    constructor(pos: number) {
        this.movePosition = pos;
    }

    public applyTo(state: State) {
        const next = new State(state);

        //put the letter on the board
        next.board[this.movePosition] = state.turn;

        if(state.turn === "O")
            next.oMovesCount++;

        next.advanceTurn();

        return next;
    }
}

AIAction.ASCENDING = function(firstAction, secondAction) {
    if(firstAction.minimaxVal < secondAction.minimaxVal)
        return -1; //indicates that firstAction goes before secondAction
    else if(firstAction.minimaxVal > secondAction.minimaxVal)
        return 1; //indicates that secondAction goes before firstAction
    else
        return 0; //indicates a tie
}

AIAction.DESCENDING = function(firstAction, secondAction) {
    if(firstAction.minimaxVal > secondAction.minimaxVal)
        return -1; //indicates that firstAction goes before secondAction
    else if(firstAction.minimaxVal < secondAction.minimaxVal)
        return 1; //indicates that secondAction goes before firstAction
    else
        return 0; //indicates a tie
}