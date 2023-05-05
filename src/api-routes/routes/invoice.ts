import { Router, Request, Response, NextFunction } from "express";
import { IInvoiceInputDTO } from "../../interfaces/IInvoice";
import Container from "typedi";
import InvoiceService from "../../services/invoiceService";
import { Logger } from "winston";

const route = Router();

export default (app: Router) => {
  app.use(route);

  route.post(
    "/add-invoice",
    async function addInvoiceAction(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      const logger: Logger = Container.get("logger");
      logger.debug("Calling Add Invoice ID %o", req.body.id);
      try {
        const invoiceServiceInstance = Container.get(InvoiceService);
        const invoice = await invoiceServiceInstance.AddInvoice(
          req.body as IInvoiceInputDTO
        );
        res.status(201).send(invoice);
      } catch (err) {
        next(err);
      }
    }
  );

  route.get("/invoices", async function getAllInvoicesAction(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const logger: Logger = Container.get("logger");
    logger.debug("Calling Get all invoices");
    try {
      const invoiceServiceInstance = Container.get(InvoiceService);
      const invoices = await invoiceServiceInstance.GetInvoices();
      res.status(200).send(invoices);
    } catch (err) {
      next(err);
    }
  });

  route.post(
    "/delete-invoice",
    async function deleteInvoiceAction(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      const logger: Logger = Container.get("logger");
      logger.debug("Calling Delete Invoice ID %o", req.body);
      try {
        const invoiceServiceInstance = Container.get(InvoiceService);
        const invoice_id = await invoiceServiceInstance.DeleteInvoice(
          req.body.id as number
        );
        res.status(201).send(invoice_id);
      } catch (err) {
        next(err);
      }
    }
  );
};
