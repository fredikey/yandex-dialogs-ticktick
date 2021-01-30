const { Alice, Reply } = require('yandex-dialogs-sdk')
const alice = new Alice();

alice.command('', async ctx => Reply.text('Привет, это демо версия!'));

alice.command('Запусти аквадискотеку', async ctx =>
		Reply.text('Аквадискотеки сегодня не будет, устроишь ее когда купишь себе дворец'),
);
alice.any(async ctx => Reply.text(`Я не понимаю !!`));

const PORT = process.env.PORT || 3001
const server = alice.listen(PORT, '/');

