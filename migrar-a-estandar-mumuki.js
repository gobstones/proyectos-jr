// 05-02-2018
// Migración correspondiente a https://github.com/gobstones/gobstones-web/pull/191/files

const fs = require("fs");
const yaml = require("js-yaml");

const chapters = fs.readdirSync("./Proyectos");
chapters.forEach((chapter) => {
	if (chapter.endsWith(".gitkeep")) return;

	const exercises = fs.readdirSync(`./Proyectos/${chapter}`);
	exercises.forEach((exercise) => {
		if (exercise.endsWith(".gitkeep")) return;
		
		const exercisePath = `./Proyectos/${chapter}/${exercise}`;
		const path = (f) => `${exercisePath}/${f}`;

		const files = fs.readdirSync(exercisePath);
		
		const code = files.find((it) => it.endsWith(".gbs"));
		if (code) fs.renameSync(path(code), path("content.gbs"));

		const blocks = files.find((it) => it.endsWith(".gbjs"));
		if (blocks) fs.renameSync(path(blocks), path("content.gbk"));

		const library = files.find((it) => it.endsWith(".gbl"));
		if (library) fs.renameSync(path(library), path("backpack.gbs"));

		const blocksLibrary = files.find((it) => it.endsWith(".gbjl"));
		if (blocksLibrary) fs.renameSync(path(blocksLibrary), path("backpack.gbk"));

		const teacherLibrary = files.find((it) => it.endsWith(".gbt"));
		if (teacherLibrary) fs.renameSync(path(teacherLibrary), path("extra.gbs"));

		const description = files.find((it) => it.endsWith(".md"));
		if (description) fs.renameSync(path(description), path("description.md"));

		const meta = files.find((it) => it.endsWith(".json"));
		if (meta) {
			fs.renameSync(path(meta), path("meta.yml"));
			const config = JSON.parse(fs.readFileSync(path("meta.yml")).toString());
			fs.writeFileSync(path("meta.yml"), yaml.safeDump(config, { sortKeys: true }));
		}

		const attires = files.find((it) => it.endsWith("attires"));
		if (attires) {
			const newAssetsPath = path("assets");
			try { fs.mkdirSync(newAssetsPath); } catch(e) { }
			fs.renameSync(path(attires), `${newAssetsPath}/attires`);

			const theAttires = fs.readdirSync(path("assets/attires"));
			theAttires.forEach((attire) => {
				if (attire.endsWith(".gitkeep")) return;
				
				const attirePath = path(`assets/attires/${attire}`);
				const aPath = (f) => `${attirePath}/${f}`;

				const attireFiles = fs.readdirSync(attirePath);

				const attireConfig = attireFiles.find((it) => it.endsWith(".json"));
				if (attireConfig) {
					fs.renameSync(aPath(attireConfig), aPath("config.yml"));
					const config = JSON.parse(fs.readFileSync(aPath("config.yml")).toString());
					fs.writeFileSync(aPath("config.yml"), yaml.safeDump(config, { sortKeys: true }));
				}
			});
		}
	});
});