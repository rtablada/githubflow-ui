import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  complete: DS.attr('boolean'),
  answers: DS.hasMany('answer')
});
