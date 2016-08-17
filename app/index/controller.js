import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    getNextStep(answer) {
      answer.get('to').then((prompt) => {
        this.set('prompts', [...this.prompts, prompt]);
      });
    },
  },
});
