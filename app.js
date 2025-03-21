
const axios = require('axios');
const cheerio = require('cheerio');
const ExcelJS = require('exceljs');


class Scrape {
	constructor(website) {
	  this.website = website;
	}

	async getSubsites() {
		try {
			const { data } = await axios.get(this.website);
	
			const $ = cheerio.load(data);
	
			const allSubsites = [];
			console.log(`Searching for subsites for ${this.website}`);
			$('div[id="navbar"]').find('ul.nav > li.dropdown > a').each(function(index, element){
				if($(element).attr('href') !== '#'){
					allSubsites.push($(element).attr('href'))
				}
			});
			console.log(`${allSubsites.length} subsites were found for ${this.website}`);
			this.subsites = allSubsites;
			return allSubsites;
			
	
		} catch (error) {
			console.log(`Could not find Subsites to scrape for ${this.website}`);
			return 'none';
			
		}
	};

	async getTodoSubsites() {
		try {
			const { data } = await axios.get(this.website);
	
			const $ = cheerio.load(data);
	
			const allSubsites = [];
			console.log(`Searching for Todo subsites for ${this.website}`);
			$('div[id="navbar"]').find('ul.nav > li.dropdown > ul.dropdown-menu > li > a.st-link').each(function(index, element){
				if($(element).text().includes('TODO') || $(element).text().includes('TODOS') || $(element).text().includes('todo') || $(element).text().includes('todos')
				|| $(element).text().includes('Todos') || $(element).text().includes('Todo')){
					allSubsites.push($(element).attr('href'))
				}
			});
			console.log(`${allSubsites.length} Todo subsites were found for ${this.website}`);
			//console.log(allSubsites)
			this.TodoSubsites = allSubsites;
			return allSubsites;
			
	
		} catch (error) {
			console.log(`Could not find Todo Subsites to scrape for ${this.website}`);
			return 'none';
			
		}
	};

	async getNintendoSubsites() {
		try {
			const { data } = await axios.get(this.website);
	
			const $ = cheerio.load(data);
	
			const allSubsites = [];
			console.log(`Searching for Nintendo Switch subsites for ${this.website}`);
			$('div[id="navbar"]').find('ul.nav > li.dropdown > ul.dropdown-menu > li > a.st-link').each(function(index, element){
				if($(element).text().includes('Nintendo Switch')){
					allSubsites.push($(element).attr('href'))
				}
			});
			console.log(`${allSubsites.length} Nintendo Switch subsites were found for ${this.website}`);
			this.nintendoSubsites = allSubsites;
			return allSubsites;
			
	
		} catch (error) {
			console.log(`Could not find Nintendo Switch Subsites to scrape for ${this.website}`);
			return 'none';
			
		}
	};

	async getPCSubsites() {
		try {
			const { data } = await axios.get(this.website);
	
			const $ = cheerio.load(data);
	
			const allSubsites = [];
			console.log(`Searching for custom PC subsites for ${this.website}`);
			$('div[id="navbar"]').find('ul.nav > li.dropdown > ul.dropdown-menu > li > a.st-link').each(function(index, element){
				if($(element).text().includes('Mojang') || $(element).text().includes('Steam') || $(element).text().includes('Origin') || 
				$(element).text().includes('Rockstar') || $(element).text().includes('Battle') || $(element).text().includes('Gog')){
					allSubsites.push($(element).attr('href'))
				}
			});
			console.log(`${allSubsites.length} custom PC subsites were found for ${this.website}`);
			this.PCSubsites = allSubsites;
			return allSubsites;
			
	
		} catch (error) {
			console.log(`Could not find custom PC Subsites to scrape for ${this.website}`);
			return 'none';
			
		}
	};

	async getXboxSubsites() {
		try {
			const { data } = await axios.get(this.website);
	
			const $ = cheerio.load(data);
	
			const allSubsites = [];
			console.log(`Searching for custom Xbox subsites for ${this.website}`);
			$('div[id="navbar"]').find('ul.nav > li.dropdown > ul.dropdown-menu > li > a.st-link').each(function(index, element){
				if($(element).text().includes('Xbox') || $(element).text().includes('XBOX')){
					allSubsites.push($(element).attr('href'))
				}
			});
			console.log(`${allSubsites.length} custom Xbox subsites were found for ${this.website}`);
			this.xboxSubsites = allSubsites;
			return allSubsites;
			
	
		} catch (error) {
			console.log(`Could not find custom Xbox Subsites to scrape for ${this.website}`);
			return 'none';
			
		}
	};

	async getPages(site) {
		try {

			const { data } = await axios.get(site);
	
			const $ = cheerio.load(data);
	
			const allPages = [];
			allPages.push(site);
			let thisPage = site;
			let counter = 1; 
	
			console.log(`Loading pages for ${site}`);
			while (thisPage){
				let nextPage = await getNextPage(thisPage);
				if(nextPage){
					allPages.push(nextPage);
					thisPage = nextPage;
					counter++;
				}else{
					console.log(`${counter} pages were loaded for ${site}`);
					break;
				}

			}
			
			return allPages;
				
		} catch (error) {
			console.log(`Could not find pages to scrape for ${this.website}`);
		}
	};
  }
  
const getNextPage = async(p) => {
    try {
		const { data } = await axios.get(p);

		const $ = cheerio.load(data);

        let nextPage = $('div.col-xs-12 > nav > ul.pagination > li.next > a').attr('href');
        
        return nextPage;

	} catch (error) {
		throw error;
	}
};


const getGameTitles = async (p) => {
	try {
		const { data } = await axios.get(p);
		const $ = cheerio.load(data);
		const gameTitles = [];

		$('div > h4.nombre').each((_idx, el) => {
			const gameTitle = $(el).text()
			gameTitles.push(gameTitle)
		});

		return gameTitles;
	} catch (error) {
		console.log(`Could not find Game Titles to scrape for ${this.website}`);
	}
};

const getGameLinks = async (p) => {
	try {
		const { data } = await axios.get(p);
		const $ = cheerio.load(data);
		const gameLinks = [];

		$('div.product-col > a.product-hover').each((_idx, el) => { 
			const gameLink = $(el).attr('href')
			gameLinks.push(gameLink)
		});

        //console.log(gameLinks);
		return gameLinks;
	} catch (error) {
		console.log(`Could not find pages to scrape for ${this.website}`);
	}
};

const createWB = async (arr) => {

    const workbook = new ExcelJS.Workbook();
    
    workbook.created = new Date();
    workbook.modified = new Date();

    const sheet = workbook.addWorksheet('Sheet 1');
    sheet.addTable({
        name: 'JDB',
        ref: 'A1',
        headerRow: true,
        totalsRow: false,
        style: {
            theme: 'TableStyleMedium6',
            showRowStripes: true,
        },
        columns: [
            {name: 'Website', filterButton: true},
            {name: 'Game', filterButton: true},
            {name: 'Link', filterButton: true},
        ],
        rows: arr,
        });

    await workbook.xlsx.writeFile('webscrape.xlsx');
};

const addRows = async () => {

	const workbook = new ExcelJS.Workbook();
	await workbook.xlsx.readFile('test.xlsx');
	const sheet = workbook.getWorksheet('Sheet 1');

	//sheet.addRow([8,9,0]);




	const table = sheet.getTable('JDB');
	table.addRow([8,9,0,'End']);
	table.commit();

	await workbook.xlsx.writeFile('test.xlsx');

}



const bastergames = new Scrape("https://bastergames.com/");
const edigitalmail = new Scrape ("https://e-digitalmail.com");
//const fivegamermexico = new Scrape ("fivegamermexico.com"); redirects to juegosdigitalesmexico.mx
const fivergamerchile = new Scrape ("https://fivergamerchile.com");
const gamecode = new Scrape ("https://gamecode.pe");
const gameonperu = new Scrape ("https://gameonperu.com");
const gamestorechile = new Scrape ("https://gamestorechile.com");
const gamestorecolumbia = new Scrape ("https://gamestorecolumbia.com");
const gamestorecuador = new Scrape ("https://gamestorecuador.com");
const gamestoremexico = new Scrape ("https://gamestoremexico.com");
const gamestoreperu = new Scrape ("https://gamestoreperu.com");
const gamestoreuruguay = new Scrape ("https://gamestoreuruguay.com");
const juegodigitalecuador = new Scrape ("https://juegodigitalecuador.com");
const juegosdigitales24horas = new Scrape ("https://juegosdigitales24horas.com");
const juegosdigitalesargentina = new Scrape ("https://juegosdigitalesargentina.com");
const juegosdigitalesbolivia = new Scrape ("https://juegosdigitalesbolivia.com");
const juegosdigitalesbrasil = new Scrape ("https://juegosdigitalesbrasil.com");
const juegosdigitaleschile = new Scrape ("https://juegosdigitaleschile.com");
const juegosdigitalescolombia = new Scrape ("https://juegosdigitalescolombia.com");
//const juegosdigitalesecuador = new Scrape ("https://juegosdigitalesecuador.ec"); link is broken
const juegosdigitalesguatemala = new Scrape ("https://juegosdigitalesguatemala.com");
const juegosdigitaleshonduras = new Scrape ("https://juegosdigitaleshonduras.com");
const juegosdigitalesmexico = new Scrape ("https://juegosdigitalesmexico.mx");
const juegosdigitalespanama = new Scrape ("https://juegosdigitalespanama.com");
const juegosdigitalesparaguay = new Scrape ("https://juegosdigitalesparaguay.com");
const juegosdigitalesperu=new Scrape ("https://juegosdigitalesperu.com");
const juegosdigitalesrd=new Scrape ("https://juegosdigitalesrd.com");
const juegosdigitalesuruguay=new Scrape ("https://juegosdigitalesuruguay.com");
const juegosdigitalesvenezuela=new Scrape ("https://juegosdigitalesvenezuela.com");
const necdigitalstorecl=new Scrape ("https://necdigitalstore.cl");
const necdigitalstore=new Scrape ("https://necdigitalstore.com");
const nintendogamesar=new Scrape ("https://nintendogames.ar");
const nintendogamescl=new Scrape ("https://nintendogames.cl");
const nintendogamesco=new Scrape ("https://nintendogames.co");
const nintendogamesec=new Scrape ("https://nintendogames.ec");
const nintendogamesmx=new Scrape ("https://nintendogames.mx");
const nintendogamespe=new Scrape ("https://nintendogames.pe");
const nintendogamesuy=new Scrape ("https://nintendogames.uy");
const progamerargentina=new Scrape ("https://progamerargentina.com");
//=new Scrape ("juegosdigitaleschile.com"); duplicate link
const ps3digitalchile=new Scrape ("https://ps3digitalchile.com");
const ps3digitalmexico=new Scrape ("https://ps3digitalmexico.com");
const ps3digitalperu=new Scrape ("https://ps3digitalperu.com");
const ps4digitalargentina=new Scrape ("https://ps4digitalargentina.com");
const ps4digitalchile=new Scrape ("https://ps4digitalchile.com");
const ps4digitalcolombia=new Scrape ("https://ps4digitalcolombia.com");
const ps4digitalecuador=new Scrape ("https://ps4digitalecuador.com");
const ps4digitalmexico=new Scrape ("https://ps4digitalmexico.com");
const ps4digitalperu=new Scrape ("https://ps4digitalperu.com");
const ps5digital=new Scrape ("https://ps5digital.co");
const ps5digitalargentina=new Scrape ("https://ps5digitalargentina.com");
const ps5digitalchile=new Scrape ("https://ps5digitalchile.com");
const ps5digitalecuador=new Scrape ("https://ps5digitalecuador.com");
const ps5digitalmexico=new Scrape ("https://ps5digitalmexico.com");
const ps5digitalperu=new Scrape ("https://ps5digitalperu.com");
const shercydior=new Scrape ("https://shercydior.com");
const storegames=new Scrape ("https://storegames.ar");
const storegamesbolivia=new Scrape ("https://storegamesbolivia.com");
const storegamesbrasil=new Scrape ("https://storegamesbrasil.com");
const storegameschile=new Scrape ("https://storegameschile.com");
const storegamescolombia=new Scrape ("https://storegamescolombia.com");
const storegamesecuador=new Scrape ("https://storegamesecuador.com");
const storegamesguatemala=new Scrape ("https://storegamesguatemala.com");
const storegamesmexico=new Scrape ("https://storegamesmexico.com");
const storegamesparaguay=new Scrape ("https://storegamesparaguay.com");
const storegamesperu=new Scrape ("https://storegamesperu.com");
const storegamesuruguay=new Scrape ("https://storegamesuruguay.com");


let allObj = [bastergames, edigitalmail, fivergamerchile, gamecode, gameonperu, gamestorechile, gamestorecolumbia, gamestorecuador, gamestoremexico, gamestoreperu,
	 gamestoreuruguay, juegodigitalecuador, juegosdigitales24horas, juegosdigitalesargentina, juegosdigitalesbolivia, juegosdigitalesbrasil, juegosdigitaleschile,
	juegosdigitalescolombia, juegosdigitalesguatemala, juegosdigitaleshonduras, juegosdigitalesmexico, juegosdigitalespanama, juegosdigitalesparaguay, juegosdigitalesperu,
	juegosdigitalesrd, juegosdigitalesuruguay, juegosdigitalesvenezuela, necdigitalstorecl, necdigitalstore, nintendogamesar, nintendogamescl, nintendogamesco, nintendogamesec,
	nintendogamesmx, nintendogamespe, nintendogamesuy, progamerargentina, ps3digitalchile, ps3digitalmexico, ps3digitalperu, ps4digitalargentina, ps4digitalchile, ps4digitalcolombia,
	ps4digitalecuador, ps4digitalmexico, ps4digitalperu, ps5digital, ps5digitalargentina, ps5digitalchile, ps5digitalecuador, ps5digitalmexico, ps5digitalperu, shercydior,
	storegames, storegamesbolivia, storegamesbrasil, storegameschile, storegamescolombia, storegamesecuador, storegamesguatemala, storegamesmexico, storegamesparaguay,
	storegamesperu, storegamesuruguay, juegosdigitaleschile
 ]; 

let todoObj = [gamecode, juegosdigitalesperu, necdigitalstore, nintendogamesar, nintendogamesco, nintendogamesec, ps3digitalperu,
	ps4digitalperu, ps5digitalperu, storegamesmexico];

let nintendoObj = [gamestoremexico, gamestoreperu, nintendogamesco, ps3digitalmexico, ps4digitalmexico, ps4digitalperu, ps5digitalmexico, ps5digitalperu,
	storegamesmexico];

let pcObj = [gamestoremexico, gamestoreperu, juegosdigitalesperu, ps3digitalmexico, ps3digitalperu, ps4digitalmexico, ps4digitalperu, ps5digitalmexico, 
	ps5digitalperu, storegamesmexico];

let xboxObj = [ps3digitalperu, storegamesmexico];

let rows = [];

const run = async (obj) => {

	obj.subsites = await obj.getSubsites();
	let idx = 0;

	if(obj.subsites !== 'none'){
		for (let site of obj.subsites){
			pages = await obj.getPages(site)
	
			for (page of pages){
				gameTitles = await getGameTitles(page);
				gameLinks = await getGameLinks(page);
		
				for(game of gameTitles){
					rows.push([obj.website,game, gameLinks[idx]])
					if(idx > gameLinks.length - 2){
						idx = 0;
					}else{
						idx = idx + 1;
					}
				};
			};
		}

	} else{
		console.log('Moving on to next scrape');
	}
};

const todoRun = async (obj) => {

	//obj.altSubsites = await obj.getAltSubsites();
	await obj.getTodoSubsites();
	let idx = 0;

	if(obj.TodoSubsites !== 'none'){
		for (let site of obj.TodoSubsites){
			pages = await obj.getPages(site)
	
			for (page of pages){
				gameTitles = await getGameTitles(page);
				gameLinks = await getGameLinks(page);
		
				for(game of gameTitles){
					rows.push([obj.website,game, gameLinks[idx]])
					if(idx > gameLinks.length - 2){
						idx = 0;
					}else{
						idx = idx + 1;
					}
				};
			};
		}

	} else{
		console.log('Moving on to next scrape');
	}
};

const pcRun = async (obj) => {

	await obj.getPCSubsites();
	let idx = 0;

	if(obj.PCSubsites !== 'none'){
		for (let site of obj.PCSubsites){
			pages = await obj.getPages(site)
	
			for (page of pages){
				gameTitles = await getGameTitles(page);
				gameLinks = await getGameLinks(page);
		
				for(game of gameTitles){
					rows.push([obj.website,game, gameLinks[idx]])
					if(idx > gameLinks.length - 2){
						idx = 0;
					}else{
						idx = idx + 1;
					}
				};
			};
		}

	} else{
		console.log('Moving on to next scrape');
	}
};

const xboxRun = async (obj) => {

	await obj.getXboxSubsites();
	let idx = 0;

	if(obj.xboxSubsites !== 'none'){
		for (let site of obj.xboxSubsites){
			pages = await obj.getPages(site)
	
			for (page of pages){
				gameTitles = await getGameTitles(page);
				gameLinks = await getGameLinks(page);
		
				for(game of gameTitles){
					rows.push([obj.website,game, gameLinks[idx]])
					if(idx > gameLinks.length - 2){
						idx = 0;
					}else{
						idx = idx + 1;
					}
				};
			};
		}

	} else{
		console.log('Moving on to next scrape');
	}
};

const nintendoRun = async (obj) => {

	await obj.getNintendoSubsites();
	let idx = 0;

	if(obj.nintendoSubsites !== 'none'){
		for (let site of obj.nintendoSubsites){
			pages = await obj.getPages(site)
	
			for (page of pages){
				gameTitles = await getGameTitles(page);
				gameLinks = await getGameLinks(page);
		
				for(game of gameTitles){
					rows.push([obj.website,game, gameLinks[idx]])
					if(idx > gameLinks.length - 2){
						idx = 0;
					}else{
						idx = idx + 1;
					}
				};
			};
		}

	} else{
		console.log('Moving on to next scrape');
	}
};


const start = async () =>{

	for( let i of allObj){
		await run(i);
	}

	for( let i of todoObj){
		await todoRun(i);
	}

	for( let i of nintendoObj){
		await nintendoRun(i);
	}

	for( let i of pcObj){
		await pcRun(i);
	}

	for( let i of xboxObj){
		await xboxRun(i);
	}

	await createWB(rows);
}

//start();


const test = async() => {
	await nintendogamesar.getTodoSubsites();
	console.log(nintendogamesar.TodoSubsites);
}

//test();

