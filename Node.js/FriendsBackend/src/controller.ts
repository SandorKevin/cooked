import { Request, Response, Router } from "express";
import IController from "./interfaces";
import { oneSideModel, manySideModel } from "./models";

export default class myController implements IController {
    public router = Router();
    private one = oneSideModel;
    private many = manySideModel;

    constructor() {
        // exam handlers:
        this.router.get("/api/search-by-season/:season", this.searchBySeason);
        this.router.post("/api/add-season", this.createOne);
        this.router.delete("/api/delete-season/:id", this.deleteOne);
    }

    private deleteOne = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            // Check if document has reference in manySide table:
            const refDocuments = await this.many.find({ seasonId: id });
            if (refDocuments.length > 0) {
                res.status(403).send({ message: "Az évad nem törölhető!" });
            } else {
                const successResponse = await this.one.findByIdAndDelete(id);
                if (successResponse) {
                    res.sendStatus(204);
                } else {
                    res.status(404).send({ message: "Az évad nem létezik!" });
                }
            }
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    };

    private createOne = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            // with _id "auto increment" sulution:
            let autoId: number = 1;
            const oneAll = await this.one.find();
            if (oneAll.length > 0) {
                autoId = Math.max(...oneAll.map(d => d._id as number)) + 1;
            }
            const createdDocument = new this.one({
                _id: autoId,
                ...body,
            });

            const savedDocument = await createdDocument.save();
            res.status(201).send({ _id: savedDocument._id });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    };

    private searchBySeason = async (req: Request, res: Response) => {
        try {
            const paramSeason = req.params.season;

            const data = await this.many.aggregate([
                {
                    $lookup: { from: "seasons", foreignField: "_id", localField: "seasonId", as: "season" },
                },
                {
                    $match: { "season.season": paramSeason },
                },
                {
                    $project: { season: 0 },
                },
            ]);
            if (data.length > 0) {
                res.send(data);
            } else {
                res.status(404).send({ message: "Hibás évad!" });
            }
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    };

}
