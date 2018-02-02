const fs = require("fs");

const BASE_DIR = "Proyectos";

const guides = [];

const guideDirs = fs.readdirSync(BASE_DIR)
guideDirs.forEach((guideDir) => {
	const guide = {
		name: guideDir,
		repo: "gobstones/proyectos-jr",
		exercises: []
	};

	const exerciseDirs = fs.readdirSync(`./${BASE_DIR}/${guideDir}`);
	exerciseDirs.forEach((exerciseDir) => {
		if (exerciseDir === ".gitkeep") return;

		guide.exercises.push({
			id: exerciseDir.substring(0, exerciseDir.lastIndexOf(".")),
			name: exerciseDir.substring(exerciseDir.lastIndexOf(".") + 1),
			path: `${BASE_DIR}/${guideDir}/${exerciseDir}`
		});
	});

	guides.push(guide);
});

console.log(JSON.stringify(guides, null, 2));