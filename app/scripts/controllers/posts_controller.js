
Blogger.PostsController = Ember.ArrayController.extend({
  months: ['January','Feburary','March','April','May','June','July','August','September','October','November','December'],

  recentPosts: function(){
    var content = this.get('content.content');
    if(!Em.isEmpty(content))
      return content.slice(0,5);
  }.property('content.length'),

  _content: function(){
    var content = this.get('content.content'),
        tempMonth, 
        tempYear, 
        yearArray = Em.A(), 
        monthArray,monthObj,yearObj,
        self = this;

    if(Em.isArray(content)){

    var xxx = content.map(function(itm,idx){
      var date = itm.get('date'),
        year = date.getFullYear(),
        month = date.getMonth();  
      
      if(year !== tempYear)
        monthArray = Em.A();

      if(month != tempMonth){
        tempMonth = month;
        monthObj = Em.Object.create();        
        monthObj.set('key',self.get('months')[month]);
        monthObj.set('value',Em.A());
        monthArray.pushObject(monthObj);
      }      
      
      monthObj.get('value').pushObject(itm);

      if(year != tempYear){
        tempYear = year;
        yearObj = Em.Object.create();        
        yearObj.set('key',year);
        yearObj.set('value',monthArray);
        return yearObj;
      }
    }).compact();
    console.log(xxx);
    return xxx;
    }
  }.property('content.length'),

  gravatarUrl: function(){
    return "http://www.gravatar.com/avatar/"+MD5('selvaganeshbsg@ymail.com')+"&s=200";
  }.property()

});


Blogger.YearItemController = Ember.ObjectController.extend({
  isExpanded: false
});

Blogger.MonthItemController = Ember.ObjectController.extend({
  isExpanded: false
});


