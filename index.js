const ticktick = require('ticktick-wrapper');

module.exports.handler = async (event, _context) => {
	
	const {version, session, request, state} = event;
	
	const output = {
		version,
		session,
		response: {
			text: 'Привет, ты можешь добавить задачу!',
			end_session: false,
		},
	};
	
	const login = async () => {
		const authData = await ticktick.login({
			email: {
				username: process.env.TICKTICK_EMAIL,
				password: process.env.TICKTICK_PASSWORD,
			}
		});
		
		output.user_state_update = authData
	}
	// Auth
	if (state.user && state.user.cookie && state.user.userInfo) {
		ticktick.restoreSession(state.user)
	} else {
		await login()
	}
	
	const addTask = async () => {
		if (request['original_utterance'].length > 0) {
			const taskTitle = request['original_utterance']
			
			const description = 'Задача с Яндекс станции';
			await ticktick.Inbox.addSimpleTask(taskTitle, description);
			
			output.response.text = `${taskTitle}, Успешно добавлена!`
			output.response.end_session = true
		}
	}
	
	try {
		await addTask()
	} catch {
		await login()
		await addTask()
	}
	
	return output;
};
