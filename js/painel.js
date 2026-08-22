const TABELA = document.querySelector('#sensores tbody');

const LISTA_ALERTAS = document.querySelector('#lista-alertas');
const LIMITE_CRITICO = 27;

async function carregarSensores() {
  const resposta = await fetch('dados/sensores.json');
  const sensores = await resposta.json();
  sensores.forEach(desenharLinha);
}

function converterTemperatura(leitura) {
  return (leitura - 32) * 9 / 5;
}


function verificarStatus(celsius) {
  if (celsius < LIMITE_CRITICO) {
    return 'critico';
  }

  return 'ok';
}

function adicionarAlerta(sensor) {
  if (sensor.valor >= LIMITE_CRITICO) {
    const item = document.createElement('li');
    item.textContent = sensor.codigo + ' - ' + sensor.descricao + ': temperatura crítica';
    item.classList.add('alerta-critico');
    LISTA_ALERTAS.appendChild(item);
  }
}





function desenharLinha(sensor) {
  const celsius = converterTemperatura(sensor.valor).toFixed(1);
  const status = verificarStatus(Number(celsius));

  const tr = document.createElement('tr');
  tr.innerHTML =
    '<td>' + sensor.codigo + '</td>' +
    '<td>' + sensor.descricao + '</td>' +
    '<td>' + celsius + ' C</td>' +
    '<td>' + status + '</td>';
  TABELA.appendChild(tr);

  adicionarAlerta(sensor);
}

function marcarAtualizacao() {
  document.querySelector('#atualizado').textContent = new Date().toLocaleString('pt-BR');
}

carregarSensores();
