/** ==========================================================================
*   Adicione novas salas e atribua um array de
*   nomes da sala setados na pasta 'salas'
*
*   Não esqueça de colocar o arquivo da sala no require do gartic.user.js
*
*   @param string nome - É o nome para exibição no select
*   @param array arr - É o array contendo as palavras da sala (js da sala)
* ===========================================================================
*/
var salas = {};

salas['alimentos'] = { nome: 'alimentos', arr: alimentos };
salas['animais'] = { nome: 'animais', arr: animais };
salas['bandeiras'] = { nome: 'bandeiras', arr: bandeiras };
salas['desenho_animado'] = { nome: 'desenho_animado', arr: desenho_animado };
salas['got'] = { nome: 'got', arr: got };
salas['objetos'] = { nome: 'objetos', arr: objetos };
salas['verbos'] = { nome: 'verbos', arr: verbos };
