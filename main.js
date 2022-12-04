"use strict";

//SameSite Error Handle
document.cookie = "safeCookie1=foo; SameSite=Lax";
document.cookie = "crossCookie=bar; SameSite=None; Secure";

const psuBtn = document.querySelector('.btn_psu');

psuBtn.onclick = function() {
	let psu = prompt("what is your contry?");
	alert('ok'+psu+'good!');
}
// 클릭 시 알림메시지
// psuBtn.addEventListener('click', () => {
//   alert('click');
// });
/*
//git test
// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer('cesiumContainer', {
  terrainProvider: Cesium.createWorldTerrain()
});    
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkZTY2YjdiNC0zMDZlLTQ1MzEtYWNlMS1jY2MyYjA1M2VhMTIiLCJpZCI6MTExMjE3LCJpYXQiOjE2NzAwNjk2MTV9.IQ6BZ9tDnlW--Nn4oESBVyAnBfDMP8xZYheTqI0Uy9g';
// Add Cesium OSM Buildings, a global 3D buildings layer.
const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());   
// Fly the camera to San Francisco at the given longitude, latitude, and height.
viewer.camera.flyTo({
  destination : Cesium.Cartesian3.fromDegrees(127.03, 37.4522, 400),
  orientation : {
    heading : Cesium.Math.toRadians(0.0),
    pitch : Cesium.Math.toRadians(-15.0),
  }
});
*/
/////////////////////////////////////////////////////////////////////////
const vworld_key = '0FBD6C52-3316-3CDE-A277-4EE6D00A2795';

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkZTY2YjdiNC0zMDZlLTQ1MzEtYWNlMS1jY2MyYjA1M2VhMTIiLCJpZCI6MTExMjE3LCJpYXQiOjE2NzAwNjk2MTV9.IQ6BZ9tDnlW--Nn4oESBVyAnBfDMP8xZYheTqI0Uy9g'

var layers = [{layer : 'Base', tileType : 'png'},
							{layer : 'gray', tileType : 'png'},
							{layer : 'midnight', tileType : 'png'},
							{layer : 'Hybrid', tileType : 'png'},
							{layer : 'Satellite', tileType : 'jpeg'}]

var selLayer = layers[4];

var wms = new Cesium.WebMapTileServiceImageryProvider({
				url : `http://api.vworld.kr/req/wmts/1.0.0/${vworld_key}/${selLayer.layer}/{TileMatrix}/{TileRow}/{TileCol}.${selLayer.tileType}`,
				layer : 'Base',
				style : 'default',
				maximumLevel: 19,
				credit : new Cesium.Credit('VWorld Korea')
});

var viewer = new Cesium.Viewer("cesiumContainer",{
	timeline : false,
	animation : false,
	baseLayerPicker : false,
	fullscreenButton: false,
	geocoder: false,
	homeButton: false,
	infoBox: false,
	sceneModePicker: false,
	selectionIndicator: false,
	navigationHelpButton: false,
	navigationInstructionsInitiallyVisible: false,	
	imageryProvider: wms,
	terrainProvider : Cesium.createWorldTerrain({
		requestVertexNormals : true
	})
});

viewer.camera.flyTo({
  destination : Cesium.Cartesian3.fromDegrees(127.03, 37.4522, 400),
  orientation : {
    heading : Cesium.Math.toRadians(0.0),
    pitch : Cesium.Math.toRadians(-15.0),
  }
});

////////////////////////////////////////////////////////////////////////
//var container = document.getElementById('popup'); //팝업이 담길 컨테이너 요소
var map; //맵 변수 선언 : 지도 객체
var mapLayer; //맵 레이어 선언 : 지도 그림(타일) 설정
var mapOverlay; //맵 오버레이 선언 : 지도 위에 팝업 옵션을 사용할 때
var mapView; //맵 뷰 선언 : 보여지는 지도 부분 설정
var hover=null; //마우스 이벤트에 사용될 변수

function init(){
	mapLayer = new ol.layer.Tile({ //타일 생성
			title : 'Vworld Map', //이름
			visible : true, //보여짐 여부
			type : 'midnight', //지도 종류(일반) ---(야간(midnight), 위성(satellite) 등)
			source : new ol.source.XYZ({ //vworld api 사용
				url : `http://api.vworld.kr/req/wmts/1.0.0/${vworld_key}/midnight/{z}/{y}/{x}.png`
			})
	});

	mapView =  new ol.View({ //뷰 생성
			projection : 'EPSG:3857', //좌표계 설정 (EPSG:3857은 구글에서 사용하는 좌표계) 
			center : new ol.geom.Point([ 128.5, 36.1 ]) //처음 중앙에 보여질 경도, 위도 
					.transform('EPSG:4326', 'EPSG:3857') //GPS 좌표계 -> 구글 좌표계
					.getCoordinates(), //포인트의 좌표를 리턴함
			zoom : 9 //초기지도 zoom의 정도값
	     });
	map = new ol.Map({ //맵 생성	
			target : 'vMap', //html 요소 id 값
			layers : [mapLayer], //레이어
			//overlays: [mapOverlay], //오버레이
			view : mapView //뷰
		 });
}

init();