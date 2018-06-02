
'use strict';

const ws = require("nodejs-websocket");

ws.createServer((socket) =>
{
	// console.log('key = %s', socket.key);

	socket.on('text', (msg) =>
	{
		console.log('收到客户端信息：%s', msg);
	})
	.on('error', (err) =>
	{
		console.error(err.stack);
	})
	.on('close', () =>
	{
		console.log('Closed!');
	});

	setInterval(() =>
	{
		if (socket.CLOSED == socket.readyState ||
			'undefined' == typeof(socket.readyState))
		{
			return;
		}

		socket.sendText(Date.now().toString());
	}, 1000);
})
.listen(8080);
