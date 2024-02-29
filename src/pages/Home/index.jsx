import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from '@mui/material';
import { Delete } from '@mui/icons-material';
import Button from "../../components/button";
import EditNome from "../../components/editNome";
import EditNota from "../../components/editNota";
import { StyledSelect } from "./styles";
import * as C from "./styles";
import knex from "../../knex/config/database";

const Home = () => {
  const [pesquisa, setPesquisa] = useState('');
  const [resultados, setResultados] = useState([]);
  const [opcoes, setOpcoes] = useState([]);
  const [celulaNomeEmEdicao, setCelulaNomeEmEdicao] = useState(null);
  const [celulaNotaEmEdicao, setCelulaNotaEmEdicao] = useState(null);
  const [celulaDataInicialEmEdicao, setCelulaDataInicialEmEdicao] = useState(null);
  const [celulaDataFinalEmEdicao, setCelulaDataFinalEmEdicao] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const select = knex('ls_jogo')
      .select('cd_jogo', 'nm_jogo', 'dt_inicial', 'dt_final', 'nota_avaliacao', 'cd_status', 'imagem');

    select.then(data => {
      setResultados(data);
    }).catch(e => {
      console.log('ERRO:', e.message);
    }).finally(() => {});
  }, []);

  const buscarResultados = () => {
    const resultadosFiltrados = resultados.filter(item =>
      (item.nm_jogo || '').toLowerCase().includes(pesquisa.toLowerCase())
    );
    setResultados(resultadosFiltrados);
  };

  const handleUpdate = async (index, novoValor) => {
    try {
      const updatedData = await knex('ls_jogo')
        .where({ cd_jogo: resultados[index].cd_jogo })
        .update({
          dt_inicial: knex.raw('CONCAT(dt_inicial, " atualizado")'),
          dt_final: knex.raw('CONCAT(dt_final, " atualizado")'),
          nota_avaliacao: knex.raw('CONCAT(nota_avaliacao, " atualizado")'),
          cd_status: knex.raw('CONCAT(cd_status, " atualizado")')
        });

      console.log(updatedData);

    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteJogo = (jogoId) => {
    const deleteSql = knex('ls_jogo')
      .where({ cd_jogo: jogoId })
      .del();

    console.log(deleteSql.toString());

    deleteSql.then((rowsAffected) => {
      console.log(`${rowsAffected} row(s) deleted.`);
    }).catch((e) => {
      console.log(e.message);
    }).finally(() => {
      knex.destroy();
    });
  };

  const handleRedirecionarCadastro = () => {
    navigate('/Signup');
  };

  const handleSair = () => {
    console.log('Sair');
    window.close();
  };

  return (
    <C.Container>
      <C.Content>
        <div>
          <C.Title>JogoVerso</C.Title>
          <C.Logo img="true" src=".\logo.png" alt="Logo da empresa" />
        </div>

        <div>
          <C.Input
            type="text"
            placeholder="Pesquisar"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
          <Button onClick={buscarResultados} Text="Pesquisar" />
        </div>

        <C.table>
          <C.thead>
            <C.tr>
              <C.th>Título</C.th>
              <C.th>Nota</C.th>
              <C.th>Status</C.th>
              <C.th>Data inicial</C.th>
              <C.th>Data final</C.th>
            </C.tr>
          </C.thead>
          <C.tbody>
            {resultados.map((item, index) => (
              <tr key={index}>
                <C.td>
                  {celulaNomeEmEdicao === index ? (
                    <EditNome
                      initialValue={item.título}
                      onSave={(novoNome) => handleUpdate(index, novoNome)}
                      onCancel={() => setCelulaNomeEmEdicao(null)}
                    />
                  ) : (
                    <div onClick={() => setCelulaNomeEmEdicao(index)}>
                      {item.título}
                    </div>
                  )}
                </C.td>

                <C.td>
                  {celulaNotaEmEdicao === index ? (
                    <EditNota
                      initialValue={item.nota}
                      onSave={(novaNota) => handleUpdate(index, novaNota)}
                      onCancel={() => setCelulaNotaEmEdicao(null)}
                    />
                  ) : (
                    <div onClick={() => setCelulaNotaEmEdicao(index)}>
                      {item.nota}
                    </div>
                  )}
                </C.td>

                <C.td>
                  <StyledSelect
                    value={opcoes[index] || ''}
                    onChange={(e) => {
                      const novaSelecao = { ...opcoes };
                      novaSelecao[index] = e.target.value;
                      setOpcoes(novaSelecao);
                    }}
                  >
                    <option value="" disabled>Alterar status</option>
                    {Object.keys(opcoes).map((opcao, opcoesIndex) => (
                      <option key={opcoesIndex} value={opcao}>
                        {opcao}
                      </option>
                    ))}
                  </StyledSelect>
                </C.td>

                <C.td
                  onClick={() => setCelulaDataInicialEmEdicao(index)}
                  style={{ cursor: "pointer", backgroundColor: celulaDataInicialEmEdicao === index ? "lightgray" : "inherit" }}
                >
                  {celulaDataInicialEmEdicao === index ? (
                    <input
                      type="date"
                      value={item.dinicio ? item.dinicio.toISOString().split('T')[0] : ''}
                      onChange={(e) => {
                        const novosResultados = [...resultados];
                        novosResultados[index].dinicio = new Date(e.target.value);
                        setResultados(novosResultados);
                      }}
                      onBlur={() => setCelulaDataInicialEmEdicao(null)}
                      autoFocus
                    />
                  ) : (
                    item.dinicio ? item.dinicio.toLocaleDateString() : ''
                  )}
                </C.td>

                <C.td
                  onClick={() => setCelulaDataFinalEmEdicao(index)}
                  style={{ cursor: "pointer", backgroundColor: celulaDataFinalEmEdicao === index ? "lightgray" : "inherit" }}
                >
                  {celulaDataFinalEmEdicao === index ? (
                    <input
                      type="date"
                      value={item.dfinal ? item.dfinal.toISOString().split('T')[0] : ''}
                      onChange={(e) => {
                        const novosResultados = [...resultados];
                        novosResultados[index].dfinal = new Date(e.target.value);
                        setResultados(novosResultados);
                      }}
                      onBlur={() => setCelulaDataFinalEmEdicao(null)}
                      autoFocus
                    />
                  ) : (
                    item.dfinal ? item.dfinal.toLocaleDateString() : ''
                  )}
                </C.td>

                <C.td>
                  <Tooltip title="Deletar item">
                    <IconButton onClick={() => handleDeleteJogo(item.id)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </C.td>

              </tr>
            ))}
          </C.tbody>
        </C.table>
        <div>
          <Button Text="Cadastro" onClick={handleRedirecionarCadastro} />
          <Button Text="Sair" onClick={handleSair} />
        </div>
      </C.Content>
    </C.Container>
  );
};

export default Home;
