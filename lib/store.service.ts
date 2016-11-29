import { Injectable } from '@angular/core';

// Purpose of Store is to have one state container for the whole app.
// Only GETSTATE, DISPATCH, and SUBSCRIBE should be invoked from outside this component

@Injectable()
export class StoreService {
    constructor() { }
    private state: Object;
    private listeners: Function[];
    /**
      private stateHistory: Object[]; //holds previous states in the form of a stack
      private listenerHistory: Function[][];
    */

    // Add functionality for initiation and updating of state here.
    // For example: if (!state) state = ...
    // After initialization, do NOT modify this.state. Copy to and modify newState, and return that instead.
    // Previous version of this.state will be saved in this.stateHistory by the dispatch method.

    private reducers: Function[];

    // Pass reducers into the addReducer function. Each reducer must take in a state, an action, and return a new state.
    // Format: function reducer( )
    private addReducer(reducer: Function): void {
        this.reducers = this.reducers.concat(reducer);
    }

    getState() { return this.state }

    dispatch(action: Object) {
        // this.stateHistory.push(this.state);
        let newState = this.reducers.reduce((state, reducer) => { return reducer(state, action) }, this.state);
        this.listeners.forEach(l => l()) //loop through the array of listeners
        return newState;
    }

    subscribe(fn) {
        // this.listenerHistory.push(this.listeners);
        this.listeners = this.listeners.concat(fn); // not altering the original listeners array.
        return () => {
            // this.listenerHistory.push(this.listeners);
            this.listeners = this.listeners.filter(func => func !== fn);
        }
    }
}
