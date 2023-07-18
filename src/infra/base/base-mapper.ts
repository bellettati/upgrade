export abstract class BaseMapper<TData, TModel> {
    abstract modelToData(model: TModel): TData
    abstract dataToModel(data: TData): TModel
    listModelToData(listModel: Array<TModel>): Array<TData> {
        const listData: Array<TData> = []
        listModel.forEach(model => listData.push(this.modelToData(model)))
        return listData
    }
    listDataToModel(listData: Array<TData>): Array<TModel> {
        const listModel: Array<TModel> = []
        listData.forEach(data => listModel.push(this.dataToModel(data)))
        return listModel
    }
}
