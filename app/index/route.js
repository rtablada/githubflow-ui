import Ember from 'ember';
import Chance from 'npm:chance';
const chance = new Chance();

export default Ember.Route.extend({
  beforeModel() {
    if (chance.bool()) {
      this.transitionTo('csp');
    } else {
      this.transitionTo('fast');
    }
  }
});
