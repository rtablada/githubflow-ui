import DS from 'ember-data';
import config from 'githubflow/config/environment';

export default DS.JSONAPIAdapter.extend({
  namespace: config.DS.namespace,
  host: config.DS.host,
});
