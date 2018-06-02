
'use strict';

const ws = require('nodejs-websocket');

const socket = ws.connect('ws://localhost:8080');

socket.on('connect', () =>
{
	console.log('已连上服务器！');

	socket.on('text', (msg) =>
	{
		console.log('收到服务器信息：%s', msg);
	})
	.on('error', (err) =>
	{
		console.error(err.stack);
	})
	.on('close', (code, reason) =>
	{
		console.log('服务器已关闭，错误码：%d，关闭原因：%s', code, reason);
	});

	setInterval(() =>
	{
		if (socket.CLOSED == socket.readyState ||
			'undefined' == typeof(socket.readyState))
		{
			return;
		}

		socket.sendText(Date.now().toString());
	}, 1234);
});
