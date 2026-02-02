entity SalesTotals {
    key MFRNR             : String(10);
    salesTotal            : Decimal(15,2);
    uniqueInvoiceCount    : Integer;
    lineCount             : Integer;
    unitsTotal            : Decimal(15,2);
    quantityTotal         : Decimal(15,2);
}