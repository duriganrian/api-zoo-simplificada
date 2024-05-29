import { Ave } from "../model/Ave";
import { Request, Response, response } from "express";

class AveController extends Ave {
    /**
     * Acessa a função do model que lista todas as aves
     */
    public async todos(req: Request, res: Response): Promise<Response> {
        try {
            const aves = JSON.stringify(await Ave.listarAves());

            return res.status(200).json(aves);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações`);
        }

    }

    /**
     *  chama o metodo para cadastrar uma nova ave
     * @param req Requisição
     * @param res Resposta
     * @returns  Retorna
     */

    public async novo(req: Request, res: Response): Promise<any> {
        try {
            const { nome, idade, genero, envergadura, idHabitat } = req.body;

            // Instanciando objeto Ave
            const novaAve = new Ave(nome, idade, genero, envergadura);

            // Chama o método para persistir a ave no banco de dados
            const result = await Ave.cadastrarAve(novaAve, idHabitat);
            if (result) {
                return res.status(200).json('Ave cadastrado com sucesso');
            } else {
                return res.status(400).json('Não foi possivel cadastrar o ave no banco de dados')
            }
        } catch (error) {
            console.log(`Erro ao cadastrar a ave: ${error}`);
            return res.status(400).json('Não foi possivel cadastrar o ave no banco de dados');
        }
    }



    public async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idAnimal = parseInt(req.query.idAnimal as string);

            const resultado = await Ave.removerAve(idAnimal);

            if (resultado) {
                return res.status(200).json('Animal foi removido com sucesso');
            } else {
                return res.status(401).json('Erro ao remover animal');
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return response.status(400).json("Erro ao remover ave, consulte os logs no servidor")
        }
    }

    public async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const { nome, idade, genero, envergadura } = req.body;
            const idAnimal = parseInt(req.query.idAnimal as string);
            const novaAve = new Ave(nome, idade, genero, envergadura);
            const result = await Ave.atualizarAve(novaAve, idAnimal);

            if (result) {
                return res.status(200).json('Ave atualizada com sucesso');
            } else {
                return res.status(400).json('Não foi possivel atualizar a ave no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao acessar modelo: ${error}`)
            return res.status(400).json("Erro ao atualizar ave, consulte os logs do servidor")
        }
    }
}

export default AveController;