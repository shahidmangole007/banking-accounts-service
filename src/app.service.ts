import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  /*
  BEGIN;

SELECT * 
FROM account_number_sequence
WHERE branch_code = '1101'
  AND scheme_code = 101
FOR UPDATE;

-- increment
last_sequence = last_sequence + 1;

-- build account number
accountNumber =
branchCode + schemeCode + LPAD(last_sequence, 8, '0');

UPDATE account_number_sequence
SET last_sequence = last_sequence
WHERE branch_code = '1101'
  AND scheme_code = 101;

COMMIT;
  */
}
