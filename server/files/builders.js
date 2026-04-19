class ElementBuilder{

  constructor(tag){
  this.element = document.createElement(tag);
  }
  
  setText(text){
  this.element.textContent = text;
  return this;
  }
  
  appendChild(child){
  this.element.appendChild(child);
  return this;
  }
  
  addClass(c){
  this.element.classList.add(c);
  return this;
  }
  
  setId(id){
  this.element.id = id;
  return this;
  }
  
  build(){
  return this.element;
  }
  
  }
  
  class ArticleBuilder extends ElementBuilder{
  constructor(){
  super("article");
  }
  
  }
  
  class HeadingBuilder extends ElementBuilder{
  constructor(level){
  super("h" + level);
  }
  
  }
  
  class ParagraphBuilder extends ElementBuilder{
  constructor(){
  super("p");
  }
  
  }
  
  class ImageBuilder extends ElementBuilder{
  constructor(){
  super("img");
  }
  
  setSource(src){
  this.element.src = src;
  return this;
  }
  
  }
  
  class SpanBuilder extends ElementBuilder{
  constructor(){
  super("span");
  }
  
  }
  
  class ButtonBuilder extends ElementBuilder{
  constructor(){
  super("button");
  }
  
  onClick(fn){
  this.element.onclick = fn;
  return this;
  }
  
  }