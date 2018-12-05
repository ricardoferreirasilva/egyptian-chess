/**
 * MyCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyCube(scene, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);

    this.quad = new MyRectangle(this.scene, minS, maxS, minT, maxT);
    this.quad.initBuffers();
};

MyCube.prototype = Object.create(CGFobject.prototype);
MyCube.prototype.constructor=MyCube;

MyCube.prototype.display = function() {
    this.scene.pushMatrix();
	this.scene.translate(0.0,0.0,0.5);
    this.quad.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI, 0.0, 1.0, 0.0);
	this.scene.translate(0.0,0.0,0.5);
	this.quad.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI/2, 0.0, 1.0, 0.0);
	this.scene.translate(0.0,0.0,0.5);
	this.quad.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
	this.scene.rotate(-Math.PI/2, 0.0, 1.0, 0.0);
	this.scene.translate(0.0,0.0,0.5);
	this.quad.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI/2, 1.0, 0.0, 0.0);
	this.scene.translate(0.0,0.0,0.5);
	this.quad.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
	this.scene.rotate(-Math.PI/2, 1.0, 0.0, 0.0);
	this.scene.translate(0.0,0.0,0.5);
	this.quad.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
    this.scene.popMatrix();
}