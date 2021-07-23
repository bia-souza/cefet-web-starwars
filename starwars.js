// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

import {play} from 'music.js';
import {restartAnimation} from './restart-animation.js';

const API_ENDPOINT = 'https://swapi.dev/api'

music.play({ audioUrl:'audio/tema-sw.mp3', coverImageUrl:'imgs/logo.svg', title:'Intro', artist:'John Williams' }, document.body);

let listaFilmesQuery = document.querySelector('#filmes ul');
let introducaoQuery = document.querySelector('pre.introducao');

const decimalParaRomano = {
	1: 'I',
	2: 'II',
	3: 'III',
	4: 'IV',
	5: 'V',
	6: 'VI'
}

function reiniciaIntroducao(tituloEpisodio, numEpisodio, textoAbertura) {
	let numRomano = decimalParaRomano[numEpisodio].padEnd(3,' ');
	let episodioFinal = `EPISODE ${numRomano}`;
	let intro = document.createTextNode(`${episodioFinal}\n${tituloEpisodio}\n\n${textoAbertura}`);
	introducaoQuery.innerHTML = '' 
	introducaoQuery.appendChild(intro);
	restartAnimation(introducaoQuery);
}

function preencheListaFilmes({tituloEpisodio, numEpisodio, textoAbertura}) {
	let numRomano = decimalParaRomano[numEpisodio].padEnd(3,' ');
	let episodioFinal = `EPISODE ${numRomano}`;
	let tituloFinal = document.createTextNode(`${episodioFinal} - ${tituloEpisodio}`);
	let liEpisodio = document.createElement('li');
	liEpisodio.appendChild(tituloFinal);
	liEpisodio.addEventListener('click', reiniciaIntroducao(numEpisodio,tituloEpisodio,textoAbertura));
	listaFilmesQuery.appendChild(liEpisodio);
}

fetch(`${API_ENDPOINT}/films`).then(response => response.json()).then(({results}) => results.forEach(preencheListaFilmes));
