/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/12/18
 * */
export const controllers = {
  createOne(model, body) {
    return model.create(body);
  },

  updateOne(docToUpdate, update) {
    Object.assign(docToUpdate, update);
    return docToUpdate.save();
  },

  deleteOne(docToDelete) {
    return docToDelete.remove();
  },

  getOne(docToGet) {
    return Promise.resolve(docToGet);
  },

  getAll(model) {
    return model.find({});
  },
  findByParam(model, id) {
    return model.findById(id);
  },
};

export const createOne = model => (req, res, next) => controllers.createOne(model, req.body)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error));


export const updateOne = model => (req, res, next) => {
  const docToUpdate = req.docFromId;
  const update = req.body;

  return controllers.updateOne(docToUpdate, update)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error));
};


export const deleteOne = model => (req, res, next) => {
  const docToDelete = req.docFromId;

  return controllers.deleteOne(docToDelete)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error));
};


export const getOne = model => (req, res, next) => {
  const docToGet = req.docToGet;

  return controllers.getOne(docToGet)
    .then(doc => res.status(200).json(doc))
    .catch(error => next(error));
};


export const getAll = model => (req, res, next) => controllers.getAll(model)
    .then(doc => res.status(200).json(doc))
    .catch(error => next(error));


export const findByParam = model => (req, res, next, id) => controllers.findByParam(model, id)
    .then(doc => {
      if (!doc) {
        next(new Error('Not Found Error'));
      } else {
        req.docFromId = doc;
        next();
      }
    })
    .catch(error => {
      next(error);
    });

export const generateControllers = (model, overrides = {}) => {
  const defaults = {
    findByParam: findByParam(model),
    getAll: getAll(model),
    getOne: getOne(model),
    deleteOne: deleteOne(model),
    updateOne: updateOne(model),
    createOne: createOne(model),
  };

  return { ...defaults, ...overrides };
};
