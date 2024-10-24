// pages/api/calculateFinancing.js
import { NextResponse } from 'next/server';
import connectDb from '../../../../backend/middleware/db';
import FinancingSimulation from '../../../../backend/models/financingsimulator';

const calculateFinancing = async (request) => {
  try {
    const {
      currentRevenue,
      netProfit,
      totalAssets,
      totalDebts,
      requestedAmount,
      useOfFunds
    } = await request.json();

    if (
      currentRevenue === undefined ||
      netProfit === undefined ||
      totalAssets === undefined ||
      totalDebts === undefined ||
      requestedAmount === undefined ||
      useOfFunds === undefined
    ) {
      return NextResponse.json(
        { message: 'All inputs (current revenue, net profit, total assets, total debts, requested amount, and use of funds) are required' },
        { status: 400 }
      );
    }

    const debtRatio = totalDebts / totalAssets;
    const netProfitability = (netProfit / currentRevenue) * 100;
    const workingCapital = totalAssets - totalDebts;

    let financingEligibilityScore = (1 - debtRatio) * 100 + netProfitability + (workingCapital / totalAssets) * 100;

    // Normalize the FES to be between 0 and 100
    financingEligibilityScore = Math.max(0, Math.min(financingEligibilityScore, 100));

    const financingSimulation = new FinancingSimulation({
      currentRevenue,
      netProfit,
      totalAssets,
      totalDebts,
      requestedAmount,
      useOfFunds,
      debtRatio,
      netProfitability,
      workingCapital,
      financingEligibilityScore,
    });

    await financingSimulation.save();

    return NextResponse.json(
      {
        debtRatio: debtRatio.toFixed(2),
        netProfitability: netProfitability.toFixed(2),
        workingCapital: workingCapital.toFixed(2),
        financingEligibilityScore: financingEligibilityScore.toFixed(2),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error calculating financing:', error);
    return NextResponse.json(
      { message: 'Calculation failed' },
      { status: 500 }
    );
  }
};

export const POST = connectDb(calculateFinancing);
