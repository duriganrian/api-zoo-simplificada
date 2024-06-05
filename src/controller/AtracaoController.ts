import { Request, Response } from "express";
import { Atracao } from "../model/Atracao";

class AtracaoController {
    /**
     * Acessa a função do model que lista todas as atrações
     */
    public async todos(req: Request, res: Response): Promise<Response> {
        try {
            const atracoes = await Atracao.listarAtracoes();
            return res.status(200).json(atracoes);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json('Erro ao acessar as informações');
        }
    }

    /**
     * Chama o método para cadastrar uma nova atração
     * @param req Requisição
     * @param res Resposta
     * @returns Retorna
     */
    public async novo(req: Request, res: Response): Promise<any> {
        try {
            const { nomeAtracao, idHabitat } = req.body;
            const novaAtracao = new Atracao(nomeAtracao);

            let result = false;
            if (idHabitat !== undefined) {
                result = await Atracao.cadastrarAtracao(novaAtracao, idHabitat);
            } else {
                result = await Atracao.cadastrarAtracao(novaAtracao);
            }

            if (result) {
                return res.status(200).json('Atração cadastrada com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar a atração no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao cadastrar a atração: ${error}`);
            return res.status(400).json('Não foi possível cadastrar a atração no banco de dados');
        }
    }

    /**
     * Chama o método para remover uma atração
     * @param req Requisição
     * @param res Resposta
     * @returns Retorna
     */
    public async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idAtracao = parseInt(req.query.idAtracao as string);
            const resultado = await Atracao.removerAtracao(idAtracao);

            if (resultado) {
                return res.status(200).json('Atração foi removida com sucesso');
            } else {
                return res.status(401).json('Erro ao remover atração');
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json("Erro ao remover atração, consulte os logs no servidor");
        }
    }

    /**
     * Chama o método para atualizar uma atração
     * @param req Requisição
     * @param res Resposta
     * @returns Retorna
     */
    public async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const { nomeAtracao } = req.body;
            const idAtracao = parseInt(req.query.idAtracao as string);
            const novaAtracao = new Atracao(nomeAtracao);
            const result = await Atracao.atualizarAtracao(novaAtracao, idAtracao);

            if (result) {
                return res.status(200).json('Atração atualizada com sucesso');
            } else {
                return res.status(400).json('Não foi possível atualizar a atração no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json("Erro ao atualizar atração, consulte os logs do servidor");
        }
    }
}

export default AtracaoController;
