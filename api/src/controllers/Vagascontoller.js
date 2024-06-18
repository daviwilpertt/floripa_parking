import ConexaoMySql from '../database/ConexaoMySql.js';

class VagasController {
  async listarVagas(req, resp) {
    try {
      const conexao = await new ConexaoMySql().getConexao();
      const sql = 'SELECT * FROM cadastro_vaga';
      const [resultado] = await conexao.execute(sql);

      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    };
  };


  async adicionar(req, resp) {
    try {
      const novaVaga = req.body;
      // if (!novaVaga.nome_vaga || !novaVaga.valor || !novaVaga.logradouro || !novaVaga.estado || !novaVaga.capacidade) {
        //   resp.status(400).send('Todos os campos são obrigatórios.');
        //   return;
        // }
      
      const conexao = await new ConexaoMySql().getConexao();
      const sql = 'INSERT INTO cadastro_vaga (nome_vaga, capacidade, valor, veiculo, logradouro, bairro, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      
      const [resultado] = await conexao.execute(sql, [
        novaVaga.nome_vaga,
        novaVaga.capacidade,
        novaVaga.valor,
        novaVaga.veiculo,
        novaVaga.logradouro,
        novaVaga.bairro,
        novaVaga.cidade,
        novaVaga.estado,
      ]);
      
      resp.send({ resultado });
      

    } catch (error) {
      resp.status(500).send(error.message);
    }
  }
    

    

  async atualizar(req, resp) {
    try {
      const vagaEditar = req.body;

      console.log(vagaEditar)
      if (!vagaEditar.id_vaga || !vagaEditar.nome_Vaga || !vagaEditar.valorVaga) {
        resp.status(400).send('Os campos id_cliente, nome_cliente e email_cliente são obrigatórios para atualizar.');
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const sql = 'UPDATE cliente SET nome_Vaga = ?, valorVaga = ?, capacidadeVaga = ?, logradouroVaga = ?, bairroVaga =?, cidadeVaga = ?, estadoVaga =? WHERE id_vaga = ?';
      const [resultado] = await conexao.execute(sql, [
        vagaEditar.id_vaga,
        vagaEditar.nome_Vaga,
        vagaEditar.valorVaga,
        vagaEditar.capacidadeVaga,
        vagaEditar.bairroVaga,
        vagaEditar.cidadeVaga,
        vagaEditar.estadoVaga,
        
        
      ]);

      resp.send({ resultado });
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  async excluir(req,resp) {
    try {
      const conexao = await new ConexaoMySql().getConexao();
      const sql = 'DELETE FROM cadastro_vaga WHERE id_vaga = ?';
        const [resultado] = await conexao.execute(sql,[+req.params.id_vaga]);
        resp.send(resultado);
      } catch (error) {
        resp.status(500).send(error);
      }

}
};

export default VagasController
