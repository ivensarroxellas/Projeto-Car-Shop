import {
  Model,
  Schema,
  model,
  models,
  isValidObjectId,
  UpdateQuery,
} from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async getAll(): Promise<T[]> {
    return this.model.find();
  }

  public async ValidObjectId(id: string): Promise<boolean> {
    return isValidObjectId(id);
  }

  public async getById(id: string): Promise<T | boolean | null> {
    const valid = await this.ValidObjectId(id);
    if (valid === false) {
      return false;
    }
    return this.model.findOne({ _id: id });
  }

  public async updateById(id: string, obj: Partial<T>): Promise<T | boolean | null> {
    const valid = await this.ValidObjectId(id);
    if (valid === false) {
      return false;
    }
    return this.model.findByIdAndUpdate(
      { _id: id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }
}

export default AbstractODM;