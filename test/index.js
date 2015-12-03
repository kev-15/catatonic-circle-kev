import assert from 'assert';
import catatonicCircleKev from '../lib';
import { should } from 'chai';

should(); // Modifies objects prototype to include the 'should' property

var myDatas;
beforeEach(function() {
  myDatas =
  {
    "roadAttr": {
      "building": false,
      "highway": "Residential",
      "_id": "-629863",
      "nodes": [{
        "y": 369.0,
        "x": 708.0
      },
        {
          "y": 396.0,
          "x": 743.0
        }],
      "name": "Rue de Colmar"
    },

    "amenityAttr": {
      "_id": "-629724",
      "nodes": [{
        "y": 32.0,
        "x": 629.0
      },
        {
          "y": 42.0,
          "x": 597.0
        },
        {
          "y": 43.0,
          "x": 595.0
        },
        {
          "y": 32.0,
          "x": 629.0
        }],
      "amenity": "parking"
    },

    "buildingAttr": {
      "building": true,
      "_id": "-629719",
      "nodes": [{
        "y": 0.0,
        "x": 0.0
      },
        {
          "y": 0.0,
          "x": 100.0
        },
        {
          "y": 100.0,
          "x": 100.0
        },
        {
          "y": 100.0,
          "x": 0.0
        },
        {
          "y": 0.0,
          "x": 0.0
        }]
    },

    "naturalAttr": {
      "building": false,
      "_id": "-630043",
      "nodes": [{
        "y": 309.0,
        "x": 222.0
      },
        {
          "y": 324.0,
          "x": 262.0
        },
        {
          "y": 335.0,
          "x": 231.0
        },
        {
          "y": 309.0,
          "x": 222.0
        }],
      "name": "Bassin Paul Vatine",
      "natural": "water"
    }
  };
});

describe('catatonic-circle-kev', function () {
  it('should have a version number!', function () {
    assert(typeof catatonicCircleKev.VERSION !== 'undefined', 'The Project should have a VERSION, whatever the actual version.');
  });
});



describe('catatonic-circle', function () {
  it('should have a version number!', function () {
    catatonicCircleKev.should.have.property('VERSION');
  });

  it('Test Creation of a Default Object', function() {
    catatonicCircleKev.createShape.should.to.be.a('function', 'The Shapes module sould expose a "createShape" function');
    var shape0 = catatonicCircleKev.createShape(myDatas.roadAttr);
    shape0.should.to.be.an('object', 'The "createShape" function sould return objects.');
  });

  it('Test proper hidding of properties', function() {
    var shape0 = catatonicCircleKev.createShape(myDatas.roadAttr);
    shape0.should.have.property('id','-629863','shape0 a une propriété id');
    shape0.should.have.property('toString', shape0.toString, 'shape0 a une propriété toString');
    shape0.should.have.property('toSvgPath',shape0.toSvgPath, 'shape0 a une propriété toSvgPath');
    shape0.should.have.property('getName', shape0.getName, 'shape0 a une propriété getName');

  });


  it('Test the toSVGString method', function() {
    var shape0 = catatonicCircleKev.createShape(myDatas.roadAttr);
    shape0.toSvgPath().should.equals('M 708 369 L 743 396' , 'Should create a valid SVG PATH (google SVG PATH for details)');
  });

  it('Test the name accessor', function() {
    var shape0 = catatonicCircleKev.createShape(myDatas.roadAttr);
    shape0.getName().should.equals('Rue de Colmar', 'Should return the value corresponding to the "name" property in the attributes');
  });

  it('Test the createRoad function', function() {
    catatonicCircleKev.createRoad.should.to.be.a('function', 'The Shapes module sould expose a "createRoad" function');
  });

  it('Test objects created with the createRoad function', function() {
    var road = catatonicCircleKev.createRoad(myDatas.roadAttr);
    road.getCategory.should.to.be.a('function', 'Object Created with "createRoad" Should have a getCategory function');
    road.getCategory().should.equals('Residential', 'Should return the value corresponding to the "highway" property in the attributes');
  });

  it('Test the createAmenity function', function() {
    catatonicCircleKev.createAmenity.should.to.be.a('function', 'The Shapes module sould expose a "createAmenity" function');
  });

  it('Test objects created with the  createAmenity function', function() {
    var amenity = catatonicCircleKev.createAmenity(myDatas.amenityAttr);
   amenity.getType.should.to.be.a('function', 'Object Created with "createAmenity" Should have a getType function');
    amenity.getType().should.equals('parking', 'Should return the value corresponding to the "amenity" property in the attributes');
  });

  it('Test the createBuilding function', function() {
    catatonicCircleKev.createBuilding.should.to.be.a('function', 'The Shapes module sould expose a "createBuilding" function');
  });

  it('Test objects created with the  createBuilding function', function() {
    var building = catatonicCircleKev.createBuilding(myDatas.buildingAttr);
    building.getArea.should.to.be.a('function', 'Object Created with "createBuilding" Should have a getArea function');
    building.getArea().should.equals(10000, 'Should return the area of the building computed from the set of points in the nodes attributes');
  });


  it('Test the createAmenity function', function() {
    catatonicCircleKev.createNatural.should.to.be.a('function', 'The Shapes module sould expose a "createNatural" function');
  });

  it('Test objects created with the  createNatural function', function() {
    var natural = catatonicCircleKev.createNatural(myDatas.naturalAttr);
    natural.getType.should.to.be.a('function', 'Object Created with "createNatural" Should have a getType function');
    natural.getType().should.equals('water', 'Should return the value corresponding to the "natural" property in the attributes');
  });

  it('Test to String', function(){
    var road = catatonicCircleKev.createRoad(myDatas.roadAttr);
    road.toString().should.equals('{(id : -629863 | name : Rue de Colmar) | category : Residential}');
    var building = catatonicCircleKev.createBuilding(myDatas.buildingAttr);
    building.toString().should.equals('{(id : -629719 | name : 0) | area : 10000m²}');
    var amenity = catatonicCircleKev.createAmenity(myDatas.amenityAttr);
    amenity.toString().should.equals('{(id : -629724 | name : 0) | type : parking}');
    var natural = catatonicCircleKev.createNatural(myDatas.naturalAttr);
    natural.toString().should.equals('{(id : -630043 | name : Bassin Paul Vatine) | type : water}');
  });

  it('Test objet vide', function(){
    var shape0 = catatonicCircleKev.createShape();
    shape0.should.to.be.an('object', 'The "createShape" function sould return objects.')
    var road = catatonicCircleKev.createRoad();
    road.should.to.be.an('object', 'The "createRoad" function sould return objects.');
    var building = catatonicCircleKev.createBuilding();
    building.should.to.be.an('object', 'The "createBuilding" function sould return objects.');
    var amenity = catatonicCircleKev.createAmenity()
    road.should.to.be.an('object', 'The "createAmenity" function sould return objects.');
    var natural = catatonicCircleKev.createNatural();
    road.should.to.be.an('object', 'The "createNatural" function sould return objects.');
  });


});

