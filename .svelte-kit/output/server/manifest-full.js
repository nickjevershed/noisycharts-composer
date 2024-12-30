export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["audio-playing.gif","audio-silent.gif","favicon.png","samples/novelty/car-horn-B3.mp3","samples/novelty/car-horn-B4.mp3","samples/novelty/car-horn-B5.mp3","samples/novelty/cheering.mp3","samples/novelty/cheering2.mp3","samples/novelty/dog-barking.mp3","samples/novelty/dog-barking2.mp3","samples/novelty/football.mp3","samples/piano/piano-A1.mp3","samples/piano/piano-A2.mp3","samples/piano/piano-A3.mp3","samples/piano/piano-A4.mp3","samples/piano/piano-A5.mp3","samples/piano/piano-B1.mp3","samples/piano/piano-B2.mp3","samples/piano/piano-B3.mp3","samples/piano/piano-B4.mp3","samples/piano/piano-B5.mp3","samples/piano/piano-C1.mp3","samples/piano/piano-C2.mp3","samples/piano/piano-C3.mp3","samples/piano/piano-C4.mp3","samples/piano/piano-C5.mp3","samples/piano/piano-C6.mp3","samples/piano/piano-D1.mp3","samples/piano/piano-D2.mp3","samples/piano/piano-D3.mp3","samples/piano/piano-D4.mp3","samples/piano/piano-D5.mp3","samples/piano/piano-E1.mp3","samples/piano/piano-E2.mp3","samples/piano/piano-E3.mp3","samples/piano/piano-E4.mp3","samples/piano/piano-E5.mp3","samples/piano/piano-F1.mp3","samples/piano/piano-F2.mp3","samples/piano/piano-F3.mp3","samples/piano/piano-F4.mp3","samples/piano/piano-F5.mp3","samples/piano/piano-G1.mp3","samples/piano/piano-G2.mp3","samples/piano/piano-G3.mp3","samples/piano/piano-G4.mp3","samples/piano/piano-G5.mp3","samples/piano/piano-staccato-C4.mp3","samples/piano/piano-staccato-C5.mp3","samples/piano/piano-staccato-C6.mp3","samples/strings/strings-A2.mp3","samples/strings/strings-A3.mp3","samples/strings/strings-A4.mp3","samples/strings/strings-A5.mp3","samples/strings/strings-B2.mp3","samples/strings/strings-B3.mp3","samples/strings/strings-B4.mp3","samples/strings/strings-B5.mp3","samples/strings/strings-C2.mp3","samples/strings/strings-C3.mp3","samples/strings/strings-C4.mp3","samples/strings/strings-C5.mp3","samples/strings/strings-C6.mp3","samples/strings/strings-D2.mp3","samples/strings/strings-D3.mp3","samples/strings/strings-D4.mp3","samples/strings/strings-D5.mp3","samples/strings/strings-E2.mp3","samples/strings/strings-E3.mp3","samples/strings/strings-E4.mp3","samples/strings/strings-E5.mp3","samples/strings/strings-F2.mp3","samples/strings/strings-F3.mp3","samples/strings/strings-F4.mp3","samples/strings/strings-F5.mp3","samples/strings/strings-G2.mp3","samples/strings/strings-G3.mp3","samples/strings/strings-G4.mp3","samples/strings/strings-G5.mp3","samples/strings/violin-staccato-C4.mp3","samples/strings/violin-staccato-C5.mp3","samples/strings/violin-staccato-G3.mp3","samples/trombone/trombone-C3.mp3","samples/trombone/trombone-D4.mp3","samples/trombone/trombone-E5.mp3","samples/trombone/trombone-G3.mp3","samples/trombone/trombone-end-B3.mp3","samples/trombone/trombone-end-C4.mp3","samples/trombone/trombone-end-F3.mp3","samples/trombone/trombone-end-G4.mp3","samples/trombone/trombone-end.mp3","samples/trombone/trombone2-A4.mp3","samples/trombone/trombone2-B3.mp3","samples/trombone/trombone2-C3.mp3","samples/trombone/trombone2-C5.mp3","samples/trombone/trombone2-E4.mp3","samples/trombone/trombone2-G5.mp3","samples/trombone/trombone2-end-B4.mp3","samples/trombone/trombone2-end-C4.mp3","samples/trombone/trombone2-end-D3.mp3","samples/trombone/trombone2-end-F4.mp3","samples/trombone/trombone2-end-F5.mp3","samples/trombone/trombone2-end-G3.mp3","samples/trombone/trombone3-A4.mp3","samples/trombone/trombone3-C4.mp3","samples/trombone/trombone3-D5.mp3","samples/trombone/trombone3-G3.mp3","samples/trombone/trombone3-end-G4.mp3","templates/horizontalbar.json","templates/linechart.json","templates/verticalbar.json","vite.svg"]),
	mimeTypes: {".gif":"image/gif",".png":"image/png",".mp3":"audio/mpeg",".json":"application/json",".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.CA1sOO3I.js","app":"_app/immutable/entry/app.BoapphAm.js","imports":["_app/immutable/entry/start.CA1sOO3I.js","_app/immutable/chunks/entry.CmIYw3bl.js","_app/immutable/chunks/scheduler.MoDfpPkv.js","_app/immutable/chunks/index.BtfK8WnE.js","_app/immutable/entry/app.BoapphAm.js","_app/immutable/chunks/json-loader.CH3Ki8mN.js","_app/immutable/chunks/scheduler.MoDfpPkv.js","_app/immutable/chunks/index.B1I634o-.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
