import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  from: DS.belongsTo('prompt', { inverse: 'answers' }),
  to: DS.belongsTo('prompt', { inverse: null }),
});
