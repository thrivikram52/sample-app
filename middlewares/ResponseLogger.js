import * as AbstractModels from "../models/AbstractModels";
import AuditLogs from "../models/AuditLogs";

const auditLogResponse = (err, req, res) => {
  const selectCondition = {
    requestId: req.routeObj.requestId,
  };
  const updateCondition = {
    status: true,
    responseTime: new Date().getTime() - req.routeObj.startTime,
  };
  if (req.session) {
    updateCondition.mobileNumber = req.session.mobileNumber;
    updateCondition.clientId = req.session.clientId;
    updateCondition.apiKey = req.session.apiKey;
  }
  if (req.routeObj) {
    updateCondition.routeCategory = req.routeObj.routeCategory;
  }

  if (err) {
    updateCondition.response = {
      code: err.code || 1000,
      reason: err.message,
    };
    updateCondition.status = false;
  } else {
    updateCondition.response = res.data;
  }
  AbstractModels.mongoFindOneAndUpdate(
    AuditLogs,
    selectCondition,
    updateCondition
  );
};

export const resSuccessLog = (req, res) => {
  let routeCategory;
  if (req.routeObj && req.routeObj.routeCategory) {
    routeCategory = req.routeObj.routeCategory;
  }
  if (routeCategory !== "healthCheckRoutes") {
    auditLogResponse(null, req, res);
  }
  res.status(res.statusCode || 200).send({ status: true, response: res.data });
};

export const resErrorLog = (err, req, res, next) => {
  auditLogResponse(err, req, res);
  next(err);
  res.status(res.statusCode || 200).send({
    status: false,
    response: {
      code: err.code || 1000,
      reason: err.message,
    },
  });
};
