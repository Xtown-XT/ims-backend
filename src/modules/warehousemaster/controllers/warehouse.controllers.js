import warehouse from "../models/warehouse.models.js";
import BaseService from "../../../services/service.js";

const warehouseService = new BaseService(warehouse);

// create warehouse

export const createwarehouse = async (req, res)=>{

    try{
        const data = req.body;
        const warehouse = await warehouseService.create(data);
        res.status(201).json({message:"warehouse created sucessfully",data:warehouse});
    }
    catch(error){
        res.status(400).json({message:error.message});
    }

        
    };

    // get all warehouse

    export const getAllwarehouse = async (req,res)=>{
  try {
    const result = await warehouseService.getAll({
      search: req.query.search || "",
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      orderBy: req.query.orderBy || "createdAt",
      order: req.query.order || "ASC",
      searchFields: ["warehouse_name", "city", "state", "country"],
    });

    res.status(200).json({
      message: "Warehouse fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// get warehouse by id

export const getwarehouseByid = async (req,res)=>{
    try{
        const {id} = req.params;
        const warehouse = await warehouseService.getById(id);
        res.status(200).json({message:"warehouse fetched successfully",data:warehouse});
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
}

// delte warehouse 

export const deletewarehouse = async(req,res)=>{
   try {
    const { id } = req.params; 

    const warehouseData = await warehouseService.delete(id); 

    res.status(200).json({
      message: "Warehouse deleted successfully",
      data: warehouseData,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Failed to delete warehouse",
    });
  }
};

// update warehouse

export const updatewarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await warehouseService.update(id, data);
    res.status(200).json({ message: "warehouse updated successfully", data: updated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



    


