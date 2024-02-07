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
import { useEffect, useRef, useState } from "react";
import icon from "../img/icon.png";

import html2canvas from "html2canvas";

const taxa = [4.8, 6.5, 7.5, 8, 8.8, 9.8, 10.1, 10.9, 11.7, 12.5, 13.5, 13.88];

export function Home() {
  const [received, setReceived]: any = useState("1000");
  const [parcelas, setParcelas]: any = useState("12");
  const [registers, setRegisters]: any = useState("");
  const printRef= useRef<any>("");

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
        <Table>
          <TableCaption className="h-fit">Tabela de valores</TableCaption>

          <TableHeader>
            <TableRow className="border-none flex w-[140px] gap-2 items-center text-green-600 font-bold hover:bg-slate-100  ">
              <img className="h-8 " src={icon} alt="" />
              <h1 className="">Shopping Fácil</h1>
            </TableRow>
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
                  {register.parcela}x
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

  async function printTable(){
    const element = printRef.current;
    const canvas = await html2canvas(element);

    console.log(canvas.width)
    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'cotacao.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
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
        className="flex flex-col p-3 bg-slate-100 rounded-md max-h-screen gap-5 w-4/6 max-sm:w-[98%] max/sm:h-[110%] overflow-y-auto "
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
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            onClick={printTable}
            className="w-8 h-8 text-violet-700 ml-1 mt-4 p-1 cursor-pointer"
          >
            <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
            <path
              fill-rule="evenodd"
              d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <div id="table" className="p-2" ref={printRef}>
          {createTable()}
        </div>
      </div>
    </section>
  );
}
