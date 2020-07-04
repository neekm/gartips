
// ==UserScript==
// @grant  		 none
// @name         Gartips
// @namespace    gartips
// @version      1.0.2
// @description  Mostra possíveis respostas quando tiver Dicas na tela - Desenho Animado, GoT, Animais, Alimentos, Objetos, Verbos
// @author       Neek Mikaelson
// @match        https://gartic.com.br/*
// @run-at       document-end
// @require		 http://code.jquery.com/jquery-3.3.1.min.js
// @require		 https://raw.githubusercontent.com/neekm/gartips/master/salas/alimentos.js
// @require		 https://raw.githubusercontent.com/neekm/gartips/master/salas/animais.js
// @require		 https://raw.githubusercontent.com/neekm/gartips/master/salas/bandeiras.js
// @require		 https://raw.githubusercontent.com/neekm/gartips/master/salas/desenho_animado.js
// @require		 https://raw.githubusercontent.com/neekm/gartips/master/salas/got.js
// @require		 https://raw.githubusercontent.com/neekm/gartips/master/salas/objetos.js
// @require		 https://raw.githubusercontent.com/neekm/gartips/master/salas/verbos.js
// @require		 https://raw.githubusercontent.com/neekm/gartips/master/config.js
// @require		 https://raw.githubusercontent.com/neekm/gartips/master/functions.js
// @downloadURL  https://raw.githubusercontent.com/neekm/gartips/master/gartips.user.js
// @updateURL    https://raw.githubusercontent.com/neekm/gartips/master/gartips.user.js
// ==/UserScript==


/** ================
*   FRONT JQUERY
* ==================
*/

// Executando o jQuery no modo noConflict para não dar conflito com o script do gartic
this.$ = this.jQuery = jQuery.noConflict(true);

$(function($) {

    // fix bug novo layout do gartic
    $("#tela").css("height", "auto");

    var jQuery = window.jQuery;

    // Colocando o botão de notificação para Mostrar ou Esconder o hack
    $('.opcoes').click(function() { // class do GARTIC
        if ($(this).attr('class') == 'opcoes gartips_hide') {
            $('#gartips_botoes').hide();
            $('#gartips_field_respostas').html('');
            $(this).addClass('gartips_show').removeClass('gartips_hide');
        } else {
            showBox();
            $(this).addClass('gartips_hide');
        }
    });

    // gartips box
    $('#tela').append('<div id="gartips" style="height:auto;"></div>');
    $('#gartips').append('<div id="gartips_botoes" style="clear: both; display: none; padding-top:10px; text-align:right;"></div>');

    // Select com opções de listas
    $('#gartips_botoes').append('<select id="gartips_select" style="height:39px; width:295px; text-align:center; float:left;"></select>');
    $.each(salas, function(i, sala) {
        $('#gartips_select').append(`<option value="${sala.nome.toLowerCase()}">${sala.nome.toUpperCase()} (${sala.arr.length})</option>`);
    });

    // Botões
    $('#gartips_botoes').append('<input type="text" id="gartips_search" placeholder="palavra chave" style="text-align:center; margin-left:5px; width:350px; height:30px; float:left" />');
    $('#gartips_botoes').append('<button id="gartips_get_respostas" style="margin-left:5px; width:290px; height:39px; text-align:center; float:left;">Possiveis Respostas</button>');
    $('#gartips_get_respostas').click(function() { getRespostas() });
    $('#gartips_botoes').append('<button id="gartips_limpa_respostas" style="margin-left:5px; width: 172px; height:39px; float:left;">Limpar Respostas</button>');
    $('#gartips_limpa_respostas').click(function() { limparRespostas() });

    // Resposta
    $('#gartips_botoes').append('<div id="gartips_field_respostas" style="clear:both; color:#000; font-size:18px;padding:10px; text-align:left; "></div>');

});
