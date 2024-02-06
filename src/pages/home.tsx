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
  const [registers, setRegisters]: any = useState("");

  function juros(parcelas: number, recevied: number) {
    const array: any = [];
    for (let i = 1; i <= parcelas; i++) {
      const totalAmount = recevied / (1 - taxa[i - 1] / 100);

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
                <TableCell className="text-center">
                  {register.valuePerPayent.toFixed(2)}
                </TableCell>
                <TableCell className="text-right text-green-600 font-bold">
                  R$ {register.totalAmount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    } else {
      return (
        <Table className="">
          <TableCaption>Tabela de valores</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Parcelas</TableHead>
              <TableHead>Parcelado</TableHead>
              <TableHead className="text-right">Valor cobrado</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );
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
        <div className="flex w-full max-w-sm gap-2 justify-left items-center">
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

          <svg
            onClick={()=>{window.print()}}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 ml-10 mt-1 cursor-pointer transition-all delay-100 hover:text-green-600 active:text-green-600"
          >
            <path
              fillRule="evenodd"
              d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 0 0 3 3h.27l-.155 1.705A1.875 1.875 0 0 0 7.232 22.5h9.536a1.875 1.875 0 0 0 1.867-2.045l-.155-1.705h.27a3 3 0 0 0 3-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0 0 18 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM16.5 6.205v-2.83A.375.375 0 0 0 16.125 3h-8.25a.375.375 0 0 0-.375.375v2.83a49.353 49.353 0 0 1 9 0Zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 0 1-.374.409H7.232a.375.375 0 0 1-.374-.409l.526-5.784a.373.373 0 0 1 .333-.337 41.741 41.741 0 0 1 8.566 0Zm.967-3.97a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V10.5ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div id="table" >{createTable()}</div>
      </div>
    </section>
  );
}
