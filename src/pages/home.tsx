import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/table";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { useEffect, useState } from "react";

const taxa = [4.8, 6.5, 7.5, 8, 8.8, 9.8, 10.1, 10.9, 11.7, 12.5, 13.5, 13.88];

export function Home() {
  const [received, setReceived]: any = useState("1000");
  const [parcelas, setParcelas]: any = useState("12");
  const [registers, setRegisters]: any = useState('')  ;


  function juros(parcelas: number, recevied: number) {
    const array: any = [];
    for (let i = 1; i <= parcelas; i++) {
      const totalAmount = recevied + (recevied * taxa[i - 1]) / 100;
  
      array.push({
        parcela: i,
        totalAmount: totalAmount,
        valuePerPayent: totalAmount / i,
      });
    }
    setRegisters(array);
  }

  function handleParcelas(e: any) {
    const parcelas = parseFloat(e.target.value);
    if (parcelas > 12) {
      setParcelas(12);
    } else {
      setParcelas(parcelas);
    }
  }


  function createTable() {
    if (registers.length) {
      return (
        <Table className="">
          <TableCaption>Tabela de valores</TableCaption>
  
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Parcelas</TableHead>
              <TableHead className="text-center">Parcelado</TableHead>
              <TableHead className="w-fit text-right">Valor cobrado</TableHead>
            </TableRow>
          </TableHeader>
  
          <TableBody>
            {registers.map((register: any) => (
              <TableRow className="w-fit" key={register.parcela}>
                <TableCell className="font-medium text-violet-700">
                  {register.parcela}
                </TableCell>
                <TableCell className="text-center">{register.valuePerPayent.toFixed(2)}</TableCell>
                <TableCell className="text-right text-green-600 font-bold">
                  R$ {register.totalAmount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }else{
      return (          
      
          <Table className="">
          <TableCaption>Tabela de valores</TableCaption>
      
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Parcelas</TableHead>
              <TableHead>Parcelado</TableHead>
              <TableHead className="text-right">
                Valor cobrado
              </TableHead>
            </TableRow>
          </TableHeader>
      
          
        </Table>
        )
    }
  }

  useEffect(() => {
    juros(parseFloat(parcelas), parseFloat(received));
    console.log(received + " ----- " + parcelas);


  }, [received, parcelas]);

  return (
    <section className="flex flex-col gap-5 h-screen justify-center items-center">
        <h1 className="text-slate-50 font-bold text-xl">Calculadora de taxa</h1>
      <div
        id="main-content"
        className="flex flex-col p-3 bg-slate-100 rounded-md max-h-screen gap-5 w-4/6 max-sm:w-[95%] overflow-y-auto "
      >
        <div className="flex w-full max-w-sm gap-2 justify-left">
          <div className="inputGroup">
            <Label htmlFor="montante">Valor a receber</Label>
            <Input
              className="w-[150px]"
              type="number"
              id="montante"
              placeholder="$"
              min={0}
              value={received}
              onChange={(e: any) => {
                setReceived(e.target.value);
              }}
            />
          </div>

          <div className="inputGroup">
            <Label htmlFor="montante">Parcelas</Label>
            <Input
              className="w-[70px]"
              type="number"
              id="montante"
              min={1}
              max={12}
              value={parcelas}
              onChange={handleParcelas}
            />
          </div>
        </div>

        <div id="table">{createTable()}</div>
      </div>
    </section>
  );
}
