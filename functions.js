
/** ===============================
 *  Arquivo de funções do script
 * ================================
 */


/**
 *   Setar resposta na caixa de respostas
 *
 *   @param string str Palavra resposta
 *   @return void
 */
function setResposta(str) {
    $("#respostas input").val(str); // campo de resposta do GARTIC
    $("#respostas input").focus(); // campo de resposta do GARTIC
}


/**
 *   Faz a requisição de buscar palavras pela caixa de busca
 *
 *   @param array arr Array com as palavras da sala
 *   @param string str Palavra a ser pesquisada
 *   @return void
 */
function getSearch(arr, str) {
    str = str.toLowerCase();
    for (var i = 0; i < arr.length; i++) {
        var nome = arr[i].toLowerCase();
        if (nome.indexOf(str) !== -1) {
            $('#gartips_field_respostas').append(
                '[<a id="hck_resposta_search_link_' + i + '" style="cursor:pointer;"><span style="color:#fff;">' + nome + '</span></a>] '
            );
            $('#hck_resposta_search_link_' + i).click(function() {
                setResposta($(this).text().toLowerCase())
            });
        }
    }
}


/**
 *   Mostra o box do script
 *
 *   @return void
 */
function showBox() {
    $('#gartips_botoes').show();
}


/**
 *   Limpa o box de respostas
 *
 *   @return void
 */
function limparRespostas() {
    $('#gartips_field_respostas').html('');
    $('#gartips_search').val('');
}


/**
 *   Faz a filtragem da dica, busca por possíveis palavras e mostra o box
 *
 *   @return void
 */
function getRespostas() {

    // Pegando tipo de lista
    var tipo = $('#gartips_select').val();
    var lista;
    switch (tipo) {
        case 'desenho_animado':
            lista = desenho_animado;
            break;
        case 'animais':
            lista = animais;
            break;
        case 'alimentos':
            lista = alimentos;
            break;
        case 'objetos':
            lista = objetos;
            break;
        case 'verbos':
            lista = verbos;
            break;
        case 'got':
            lista = got;
            break;
        case 'bandeiras':
            lista = bandeiras;
            break;
    }

    var palavraChave = $('#gartips_search').val();

    // limparRespostas resultados anteriores
    limparRespostas();

    // se for uma busca por palavra chave
    if (palavraChave !== '') {
        var dica = palavraChave;
        getSearch(lista, dica);
        exit();
    } else {
        // Fix caixa de dica
        $('.traco').each(function(i, obj) {
            console.log($(this));

            if (obj.innerHTML == "&nbsp;") {
                obj.textContent = '_';
            }
        });
        // pegando os dados da tela do gartic
        dica = $('.contentSpan').text();

    }

    // Pegando as letras disponíveis
    var posicoes = [];
    for (var i = 0; i < dica.length; i++) {
        if (dica[i] != '_') posicoes[i] = dica[i];

    }
    var resultado;
    // filtrando resposta
    for (i = 0; i < lista.length; i++) {
        // retirando espaços do nome na lista
        nome = lista[i];

        // Verificando a quantidade de letras
        if (nome.length == dica.length) {
            // Verifica se tem letras disponíveis
            if (posicoes.length === 0) {
                // ====== Verifica apenas a dica sem letras ======
                if (!nome.match(/ /gi)) {
                    $('#gartips_field_respostas').append('[<a id="hck_resposta_dica_link_' + i + '" style="cursor:pointer;"><span style="color:#fff;">' + lista[i] + '</span></a>] ');
                    $('#hck_resposta_dica_link_' + i).click(function() {
                        setResposta($(this).text().toLowerCase())
                    });
                }

            } else {
                // percorrendo as posições
                for (var i2 = 0; i2 < posicoes.length; i2++) {
                    // ====== Verifica a dica com letras =====

                    if (typeof posicoes[i2] != 'undefined') {
                        // se for 'espaço'recebe false
                        if (/\s/.test(posicoes[i2])) {
                            posicao = false;
                        } else {
                            posicao = posicoes[i2].toLowerCase();
                        }
                        // se for 'espaço'recebe false
                        if (/\s/.test(lista[i][i2])) {
                            letra = false;
                        } else {
                            letra = lista[i][i2].toLowerCase();
                        }

                        // Verifica se a posição e letra é igual
                        if (letra === posicao) {
                            resultado = lista[i];
                        } else {
                            resultado = false;
                            break;
                        }
                    }
                }
                // Imprime na tela a resposta
                if (resultado) {
                    $('#gartips_field_respostas').append('[<a id="hck_resposta_dica2_link_' + i + '"style="cursor:pointer;"><span style="color:#fff;">' + resultado + '</span></a>] ');
                    $('#hck_resposta_dica2_link_' + i).click(function() {
                        setResposta($(this).text().toLowerCase())
                    });
                }
            } // fim else
        } // fim if
    } // fim for
} // fim function respostas
