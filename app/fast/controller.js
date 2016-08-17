import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  metrics: Ember.inject.service(),

  reset: task(function*() {
    const [first] = this.prompts;
    this.set('prompts', []);
    this.set('thinking', true);
    yield timeout(600);

    this.set('thinking', false);
    this.set('prompts', [first]);
  }),

  answerQuestion: task(function*(answer) {
    this.set('thinking', true);
    const [prompt] = yield Ember.RSVP.all([
      answer.get('to'),
      // timeout(300),
    ]);

    this.set('thinking', false);
    this.set('prompts', [...this.prompts, prompt]);
  }),

  actions: {
    getNextStep(answer) {
      answer.get('from').then((from) => {
        this.get('metrics').trackEvent({
          category: 'fast:next',
          action: 'click',
          label: `${from.get('text')}:${answer.get('text')}`,
        });
      })

      this.get('answerQuestion').perform(answer);
    },

    restart() {
      this.get('metrics').trackEvent({eventCategory: 'fast:restart'});
      this.get('reset').perform();
    },
  },
});
