import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  reset: task(function*() {
    const [first] = this.prompts;
    this.set('prompts', []);
    this.set('thinking', true);
    yield timeout(1000);

    this.set('thinking', false);
    this.set('prompts', [first]);
  }),

  answerQuestion: task(function*(answer) {
    this.set('thinking', true);
    const [prompt] = yield Ember.RSVP.all([
      answer.get('to'),
      timeout(1000),
    ]);

    this.set('thinking', false);
    this.set('prompts', [...this.prompts, prompt]);
  }),

  actions: {
    getNextStep(answer) {
      this.get('answerQuestion').perform(answer);
    },

    restart() {
      this.get('reset').perform();
    },
  },
});
