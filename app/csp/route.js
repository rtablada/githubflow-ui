import Ember from 'ember';
import config from 'githubflow/config/environment';
import fetch from 'ember-network/fetch';

export default Ember.Route.extend({
  model() {
    return fetch(`${config.DS.host}/${config.DS.namespace}/prompts/start`)
      .then(raw => raw.json())
      .then((data) => this.store.push(data));
  },

  setupController(controller, model) {
    controller.set('prompts', [model]);
  },
});
