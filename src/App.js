import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [pos, setPos] = useState([0, 0])
	const [gyr, setGyr] = useState({x:0,y:0,z:0})

	const getPos = (gyrData) => {
		return [1, 1]
	}

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			} else if (type === 'VKWebAppGyroscopeChanged') {
				// setGyr(data)
				// let p = getPos(data)
				// setPos(p)
			}
		});
		async function fetchData() {
			bridge.send("VKWebAppGyroscopeStart", {"refresh_rate": 1000});
			setPopout(null);
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
		}
		async function fakeGyr() {
			setInterval(() => {
				// console.log(1)
				setPos({x:1, y:1})
			}, 100)
		}
		fetchData();
		fakeGyr();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel={activePanel} popout={popout}>
					<Home id='home' fetchedUser={fetchedUser} go={go} pos={pos} gyrData={gyr}/>
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
