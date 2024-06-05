import { Request, Response } from "express";
import { Habitat } from "../model/Habitat"

class HabitatController {
    /**
     * Acessa a função do model que lista todos os habitats
     */
    public async todos(req: Request, res: Response): Promise<Response> {
        try {
            const habitats = await Habitat.listarHabitats();
            return res.status(200).json(habitats);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json('Erro ao acessar as informações');
        }
    }

    /**
     * Chama o método para cadastrar um novo habitat
     * @param req Requisição
     * @param res Resposta
     * @returns Retorna
     */
    public async novo(req: Request, res: Response): Promise<any> {
        try {
            const { nomeHabitat } = req.body;
            const novoHabitat = new Habitat(nomeHabitat);
            const result = await Habitat.cadastrarHabitat(novoHabitat);

            if (result) {
                return res.status(200).json('Habitat cadastrado com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar o habitat no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao cadastrar o habitat: ${error}`);
            return res.status(400).json('Não foi possível cadastrar o habitat no banco de dados');
        }
    }

    /**
     * Chama o método para remover um habitat
     * @param req Requisição
     * @param res Resposta
     * @returns Retorna
     */
    public async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idHabitat = parseInt(req.query.idHabitat as string);
            const resultado = await Habitat.removerHabitat(idHabitat);

            if (resultado) {
                return res.status(200).json('Habitat foi removido com sucesso');
            } else {
                return res.status(401).json('Erro ao remover habitat');
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json("Erro ao remover habitat, consulte os logs no servidor");
        }
    }

    /**
     * Chama o método para atualizar um habitat
     * @param req Requisição
     * @param res Resposta
     * @returns Retorna
     */
    public async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const { nomeHabitat } = req.body;
            const idHabitat = parseInt(req.query.idHabitat as string);
            const novoHabitat = new Habitat(nomeHabitat);
            const result = await Habitat.atualizarHabitat(novoHabitat, idHabitat);

            if (result) {
                return res.status(200).json('Habitat atualizado com sucesso');
            } else {
                return res.status(400).json('Não foi possível atualizar o habitat no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json("Erro ao atualizar habitat, consulte os logs do servidor");
        }
    }
}

export default HabitatController;
