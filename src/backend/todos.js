const todos = [{
	  "id": "41824ea8-1239-4b32-861b-8620db705167",
	  "text": "Alcelaphus buselaphus cokii",
	  "done": false
		}, {
	  "id": "73c54d55-1926-4185-b76b-a5ea4fbb15fe",
	  "text": "Alcelaphus buselaphus cokii",
	  "done": false
		}, {
	  "id": "977bfecb-ec92-4de9-9b57-f2c92c065e6a",
	  "text": "Chauna torquata",
	  "done": true
		}, {
	  "id": "4c125609-9f3a-4d71-99c6-591b30652006",
	  "text": "Felis libyca",
	  "done": false
		}, {
	  "id": "a3008a2b-83a6-4d63-9736-b9df91add5a0",
	  "text": "Dusicyon thous",
	  "done": true
		}, {
	  "id": "fdc441ac-4158-4a64-b6b5-0b8f6cc51fd1",
	  "text": "Papilio canadensis",
	  "done": true
		}, {
	  "id": "0f226a2a-f8a5-4dc9-98c9-fcf96a18203c",
	  "text": "Kobus defassa",
	  "done": false
		}, {
	  "id": "b219c96b-b960-49da-bdfb-831938ea6ae8",
	  "text": "Colobus guerza",
	  "done": false
		}, {
	  "id": "11056ca8-44c9-4fbb-bf23-263898695468",
	  "text": "Phalacrocorax varius",
	  "done": false
		}, {
	  "id": "134632a8-3d67-4f15-a7cf-a098b9d24293",
	  "text": "Bassariscus astutus",
	  "done": true
		}, {
	  "id": "1174aacf-bbf0-4d4a-b665-ab26ab2e4267",
	  "text": "Ara chloroptera",
	  "done": true
		}, {
	  "id": "b8301dbf-3124-4fac-991d-3699e128a135",
	  "text": "Procyon lotor",
	  "done": false
		}, {
	  "id": "38f70bb0-5be9-441c-87b1-68c54a289f07",
	  "text": "Paroaria gularis",
	  "done": true
		}, {
	  "id": "e3374174-4594-4044-8565-cc10cbf1193d",
	  "text": "Madoqua kirkii",
	  "done": false
		}, {
	  "id": "7369a67e-8d21-4ea9-ab1f-71d780fd3bc8",
	  "text": "Dendrocygna viduata",
	  "done": true
		}, {
	  "id": "c0fb5d58-de8d-4487-87ce-de018dd8aae9",
	  "text": "Laniaurius atrococcineus",
	  "done": true
		}, {
	  "id": "5149513b-b6a8-4f69-a60a-214581dc694d",
	  "text": "Notechis semmiannulatus",
	  "done": true
		}, {
	  "id": "b2281d72-6c25-4156-be55-956ef377214c",
	  "text": "Bison bison",
	  "done": false
		}, {
	  "id": "4d956eeb-7210-404d-89e8-dee321572914",
	  "text": "Panthera leo persica",
	  "done": true
		}, {
	  "id": "91337fc7-e945-4704-bf29-6a8e57d1f077",
	  "text": "unavailable",
	  "done": true
	}]

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export default filter => delay(500).then(() => {
	switch (filter) {
		case 'ALL':
			return todos;
		case 'ACTIVE':
			return todos.filter(todo => !todo.done);
		case 'COMPLETED':
			return todos.filter(todo => todo.done);
		default:
			return [];
	}
})