import { Service, Inject } from "typedi";
import { Invoice } from "../entity/Invoice";
import { Repository } from "typeorm";
import { IInvoiceInputDTO } from "../interfaces/IInvoice";
import { CustomError } from "../utils/CustomError";

@Service()
export default class InvoiceService {
  constructor(
    @Inject("invoiceRepository") private invoiceRepository: Repository<Invoice>
  ) {}

  public async AddInvoice(invoiceInputDTO: IInvoiceInputDTO): Promise<{ invoice: string }> {
    
    const invoiceID = invoiceInputDTO.id;

    const existID = await this.invoiceRepository.findOne(invoiceID)
    if (await this.isUniqueInvoiceID(invoiceID)) {
      const newInvoice = await this.invoiceRepository.create(invoiceInputDTO);
      await this.invoiceRepository.save(newInvoice);
      return { invoice: `Invoice ID: ${newInvoice.id}` };
    } else {
      throw new CustomError("DUPLICATE KEY", 400, "This Invoice ID is aready existing")
    }
  }

  public async GetInvoices(): Promise<Invoice[]> {
    return await this.invoiceRepository.find({where: { deleted: false }});
  }

  public async DeleteInvoice(invoiceID: number): Promise<{ invoiceID: string }> {
    if (await this.validateInvoiceID(invoiceID)) {
      console.log("went to deleting");
      const deletedInvoiceID = await this.invoiceRepository.update({ id: invoiceID}, {deleted: true})
      return { invoiceID: `Deleted Invoice ID: ${deletedInvoiceID}` };
    }
    else {
      throw new CustomError("NOT FOUND", 404, "This is an invalid Invoice ID")
    }
  }

  private async validateInvoiceID(invoiceID: number) {
    const invoice_id = await this.invoiceRepository.findOne({ id: invoiceID });
    if (invoice_id) return true;
    else return false;
  }

  private async isUniqueInvoiceID(invoiceID: number) {
    const existID = await this.invoiceRepository.findOne({ id: invoiceID })
    if (!existID) return true;
    else return false;
  }
}
